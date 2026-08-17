import { pgTable, serial, varchar, numeric, timestamp } from 'drizzle-orm/pg-core';

export const tiposHabitacion = pgTable('tipos_habitacion', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 50 }).notNull().unique(),
  precioNoche: numeric('precio_noche', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});