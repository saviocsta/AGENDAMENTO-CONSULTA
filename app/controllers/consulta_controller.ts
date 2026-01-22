import Consulta from '#models/consulta'
import Disponibilidade from '#models/disponibilidade'
import { createConsultasValidator } from '#validators/consulta'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ConsultasController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.unauthorized()
    if (user.tipo !== 'paciente') return response.forbidden()

    const consultas = await Consulta.query().where('user_id', user.id)
    return consultas
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
      if (user?.tipo !== 'paciente') {
      return response.forbidden({ erro: 'Apenas pacientes' })
    }
    const { data, hora, profissional_id } = await request.validateUsing(createConsultasValidator)

    const possuiQualquerHorario = await Disponibilidade.query()
      .where('profissional_id', profissional_id)
      .first()

    if (!possuiQualquerHorario) {
      return response.badRequest({
        erro: 'Este profissional ainda não configurou seus horários de atendimento no sistema.',
      })
    }

    const dataObj = DateTime.fromJSDate(new Date(data))
    const diaDaSemana = dataObj.weekday % 7

    const disponivel = await Disponibilidade.query()
      .where('profissional_id', profissional_id)
      .where('dia_da_semana', diaDaSemana)
      .where('hora_inicio', '<=', hora)
      .where('hora_fim', '>', hora)
      .first()

    if (!disponivel) {
      return response.badRequest({
        erro: 'O profissional não atende no dia ou horário selecionado.',
      })
    }
    const jaExisteConsulta = await Consulta.query()
      .where('profissional_id', profissional_id)
      .where('data', data)
      .where('hora', hora)
      .whereNot('status', 'cancelada')
      .first()

    if (jaExisteConsulta) {
      return response.conflict({
        erro: 'Este horário já está ocupado para este profissional.',
      })
    }
    const consulta = await user.related('consultas').create({
      data,
      hora,
      status: 'agendada',
      profissional_id,
    })

    return consulta
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.unauthorized()
    if (user.tipo !== 'paciente') return response.forbidden()

    const consulta = await Consulta.find(params.id)
    if (!consulta) return response.notFound({ error: 'Consulta não existe' })

    if (consulta.userId !== user.id) {
      return response.forbidden({ error: 'Não pode cancelar' })
    }

    consulta.status = 'cancelada'
    await consulta.save()

    return { ok: true }
  }
}
