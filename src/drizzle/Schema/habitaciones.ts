import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { tiposHabitacion } from './tipos-habitacion';

export const habitaciones = pgTable('habitaciones', {
  id: serial('id').primaryKey(),
  numero: varchar('numero', { length: 10 }).notNull().unique(),
  piso: integer('piso').notNull(),
  tipoId: integer('tipo_id')
    .notNull()
    .references(() => tiposHabitacion.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});