import User from '#models/user'
import { registerSessionValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
    async login({ request }: HttpContext) {
      const {email, password} = await request.validateUsing(registerSessionValidator)
      const user = await User.verifyCredentials( email, password)
      return User.accessTokens.create(user)
    }

}