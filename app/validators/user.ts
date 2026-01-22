import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
    nome: vine.string().minLength(3),
    email: vine.string().email().normalizeEmail().unique(async (db, value) => {
        const user = await db.from('users').select('id').where('email', value).first()
        return !user
    }),
    tipo: vine.enum(['paciente', 'administrador']),
    password: vine.string().minLength(6),
})
)
