import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Disponibilidade from './disponibilidade.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class Profissional extends BaseModel {
  public static table = 'profissional'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare especialidade: string

  @hasMany(() => Disponibilidade)
  declare disponibilidades: HasMany<typeof Disponibilidade>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}