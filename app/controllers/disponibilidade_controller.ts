import Disponibilidade from '#models/disponibilidade'
import { disponibilidadeValidator } from '#validators/disponibilidade'
import type { HttpContext } from '@adonisjs/core/http'

export default class DisponibilidadesController {
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.unauthorized({ error: 'Não autenticado' })
    if (user.tipo !== 'administrador') return response.forbidden({ error: 'Apenas administrador' })

    const payload = await request.validateUsing(disponibilidadeValidator)

    if(payload.hora_inicio >= payload.hora_fim) {
      return response.badRequest({ error: 'A hora de inicio deve ser menor que a hora de fim' })
    }

    const disp = await Disponibilidade.create({
      profissional_id: payload.profissional_id,
      dia_da_semana: payload.dia_da_semana,
      hora_inicio: payload.hora_inicio,
      hora_fim: payload.hora_fim,
    })

    return response.created(disp)
  }

  async show({ params }: HttpContext) {
    return Disponibilidade.query()
      .where('profissional_id', Number(params.profissional_id))
      .orderBy('dia_da_semana', 'asc')
      .orderBy('hora_inicio', 'asc')
  }
}
