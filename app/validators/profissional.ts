import vine from '@vinejs/vine'

export const profissionalValidator = vine.compile(
    vine.object({
        nome:vine.string().minLength(3),
        especialidade:vine.string().minLength(3)
    })
)