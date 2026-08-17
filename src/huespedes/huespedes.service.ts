import { Injectable, ConflictException } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { huespedes } from '../drizzle/Schema/huespedes';
import { CreateHuespedDto } from './dto/create-huesped.dto';

@Injectable()
export class HuespedesService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(dto: CreateHuespedDto) {
    try {
      const db = this.drizzle.getDB();
      const [nuevo] = await db
        .insert(huespedes)
        .values(dto)
        .returning();
      return nuevo;
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new ConflictException('El documento de identidad ya está registrado');
      }
      throw error;
    }
  }

  async findAll() {
    return this.drizzle.getDB().select().from(huespedes);
  }
}