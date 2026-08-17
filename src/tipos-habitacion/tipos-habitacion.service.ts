import { Injectable, ConflictException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { tiposHabitacion } from '../drizzle/Schema/tipos-habitacion';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';

@Injectable()
export class TiposHabitacionService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(dto: CreateTipoHabitacionDto) {
    try {
      const db = this.drizzle.getDB();
      const [nuevo] = await db
        .insert(tiposHabitacion)
        .values({
          nombre: dto.nombre,
          precioNoche: dto.precioNoche.toString(),
        })
        .returning();
      return nuevo;
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new ConflictException('El tipo de habitación ya existe');
      }
      throw error;
    }
  }

  async findAll() {
    return this.drizzle.getDB().select().from(tiposHabitacion);
  }
}