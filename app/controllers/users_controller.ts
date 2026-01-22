import User from "#models/user"
import { createUserValidator } from "#validators/user"
import { HttpContext } from "@adonisjs/core/http"

export default class UsersController {
    async index({response}: HttpContext) {
       try {
         const users = await User.all()
         return users
       } catch (error) {
        return response.json({ error: 'Usuários não encontrados' })
       }
    }

    async store({ request }: HttpContext) {
         const payload = await request.validateUsing(createUserValidator)
         const user = await User.create(payload) // precisa conter tipo
         return user
        
    }

   
    async destroy({params, response}: HttpContext) {
        try {
            const user = await User.findBy('id', params.id)
        await user?.delete()
        return response.status(203)
        } catch (error) {
            return response.json({ error: 'Usuário não encontrado' })
            
        }
    }
}