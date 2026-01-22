import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Profissional from './profissional.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Disponibilidade extends BaseModel {
    public static table = 'disponibilidade'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare profissional_id: number

  @column()
  declare dia_da_semana: number

  @column()
  declare hora_inicio: string

  @column()
  declare hora_fim: string

  @belongsTo(() => Profissional)
  declare profissional: BelongsTo<typeof Profissional>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}