import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Profissional from './profissional.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Consulta extends BaseModel {
  public static table = 'consulta'
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare profissional_id: number

  @column()
  declare data: Date

  @column()
  declare hora: string

  @column()
  declare status: 'agendada' | 'cancelada'

  @belongsTo((() => Profissional))
  declare profissional: BelongsTo<typeof Profissional>

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare paciente: BelongsTo<typeof User>

  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}