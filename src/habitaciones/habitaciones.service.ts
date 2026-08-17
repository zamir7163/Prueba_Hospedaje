import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { habitaciones } from '../drizzle/Schema/habitaciones';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { eq, isNull, and } from 'drizzle-orm';

@Injectable()
export class HabitacionesService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(dto: CreateHabitacionDto) {
    try {
      const db = this.drizzle.getDB();
      const [nueva] = await db
        .insert(habitaciones)
        .values(dto)
        .returning();
      return nueva;
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new ConflictException('El número de habitación ya existe');
      }
      throw error;
    }
  }

  async findAll() {
    return this.drizzle.getDB()
      .select()
      .from(habitaciones)
      .where(isNull(habitaciones.deletedAt));
  }

  async findOne(id: number) {
    const db = this.drizzle.getDB();
    const [res] = await db
      .select()
      .from(habitaciones)
      .where(and(eq(habitaciones.id, id), isNull(habitaciones.deletedAt)));

    if (!res) throw new NotFoundException(`Habitación con ID ${id} no encontrada`);
    return res;
  }

  async update(id: number, dto: UpdateHabitacionDto) {
    await this.findOne(id);
    const db = this.drizzle.getDB();
    const [actualizada] = await db
      .update(habitaciones)
      .set(dto)
      .where(eq(habitaciones.id, id))
      .returning();
    return actualizada;
  }

  async remove(id: number) {
    await this.findOne(id);
    const db = this.drizzle.getDB();
    const [eliminada] = await db
      .update(habitaciones)
      .set({ deletedAt: new Date() })
      .where(eq(habitaciones.id, id))
      .returning();
    return { message: 'Habitación eliminada lógicamente', id: eliminada.id };
  }
}