import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HuespedesService } from './huespedes.service';
import { CreateHuespedDto } from './dto/create-huesped.dto';

@ApiTags('huespedes')
@Controller('huespedes')
export class HuespedesController {
  constructor(private readonly service: HuespedesService) {}

  @Post()
  create(@Body() dto: CreateHuespedDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}