import vine from '@vinejs/vine'

export const disponibilidadeValidator = vine.compile(
    vine.object({
        profissional_id:vine.number(),
        dia_da_semana:vine.number(),
        hora_inicio:vine.string(),
        hora_fim:vine.string()
    })
)