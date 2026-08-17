import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { reservas } from '../drizzle/Schema/reservas';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { eq, isNull, and } from 'drizzle-orm';

@Injectable()
export class ReservasService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(dto: CreateReservaDto) {
    const db = this.drizzle.getDB();
    const [nueva] = await db
      .insert(reservas)
      .values(dto)
      .returning();
    return nueva;
  }

  async findAll() {
    return this.drizzle.getDB()
      .select()
      .from(reservas)
      .where(isNull(reservas.deletedAt));
  }

  async findOne(id: number) {
    const db = this.drizzle.getDB();
    const [res] = await db
      .select()
      .from(reservas)
      .where(and(eq(reservas.id, id), isNull(reservas.deletedAt)));

    if (!res) throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    return res;
  }

  async update(id: number, dto: UpdateReservaDto) {
    await this.findOne(id);
    const db = this.drizzle.getDB();
    const [actualizada] = await db
      .update(reservas)
      .set(dto)
      .where(eq(reservas.id, id))
      .returning();
    return actualizada;
  }

  async remove(id: number) {
    await this.findOne(id);
    const db = this.drizzle.getDB();
    const [eliminada] = await db
      .update(reservas)
      .set({ deletedAt: new Date() })
      .where(eq(reservas.id, id))
      .returning();
    return { message: 'Reserva eliminada lógicamente', id: eliminada.id };
  }
}