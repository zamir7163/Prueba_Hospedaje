import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TiposHabitacionService } from './tipos-habitacion.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';

@ApiTags('tipos-habitacion')
@Controller('tipos-habitacion')
export class TiposHabitacionController {
  constructor(private readonly service: TiposHabitacionService) {}

  @Post()
  create(@Body() dto: CreateTipoHabitacionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}