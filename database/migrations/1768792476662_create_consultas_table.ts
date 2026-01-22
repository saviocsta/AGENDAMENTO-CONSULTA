import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consulta'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
        table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('profissional_id')
        .unsigned()
        .references('id')
        .inTable('profissional')
        .onDelete('CASCADE')

      table.date('data').notNullable()
      table.time('hora').notNullable()
      table.enum('status', ['agendada', 'cancelada']).defaultTo('agendada')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}