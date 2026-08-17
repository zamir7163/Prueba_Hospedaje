import { pgTable, serial, integer, date, varchar, timestamp } from 'drizzle-orm/pg-core';
import { habitaciones } from './habitaciones';
import { huespedes } from './huespedes';

export const reservas = pgTable('reservas', {
  id: serial('id').primaryKey(),
  huespedId: integer('huesped_id')
    .notNull()
    .references(() => huespedes.id),
  habitacionId: integer('habitacion_id')
    .notNull()
    .references(() => habitaciones.id),
  fechaEntrada: date('fecha_entrada').notNull(),
  fechaSalida: date('fecha_salida').notNull(),
  estado: varchar('estado', { length: 20 }).default('CONFIRMADA').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});