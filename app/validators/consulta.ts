import vine from '@vinejs/vine'

export const createConsultasValidator = vine.compile(
  vine.object({
    data: vine.date(),
    hora: vine.string().trim().minLength(3),
    profissional_id: vine.number(),
  })
)
export const updateConsultasValidator = vine.compile(
  vine.object({
    data: vine.date().optional(),
    hora: vine.string().trim().minLength(3).optional(),
    status: vine.string().trim().minLength(3).optional(),
    profissionalId: vine.number().optional(),
  })
)