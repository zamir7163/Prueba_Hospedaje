import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const huespedes = pgTable('huespedes', {
  id: serial('id').primaryKey(),
  docIdentidad: varchar('doc_identidad', { length: 20 }).notNull().unique(),
  nombreCompleto: varchar('nombre_completo', { length: 100 }).notNull(),
  telefono: varchar('telefono', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});