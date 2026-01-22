import Profissional from '#models/profissional'
import { profissionalValidator } from '#validators/profissional'
import { HttpContext } from '@adonisjs/core/http'

export default class ProfissionalController {
  async index() {
    const profissional = await Profissional.all()
    return profissional
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.unauthorized({ error: 'Não autenticado' })
    if (user.tipo !== 'administrador') return response.forbidden({ error: 'Apenas administrador' })

    const payload = await request.validateUsing(profissionalValidator)
    console.log(payload)
    const profissional = await Profissional.create(payload)

    return response.created(profissional)
  }
}
