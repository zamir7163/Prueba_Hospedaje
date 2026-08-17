import { Module } from '@nestjs/common';
import { TiposHabitacionController } from './tipos-habitacion.controller';
import { TiposHabitacionService } from './tipos-habitacion.service';

@Module({
  controllers: [TiposHabitacionController],
  providers: [TiposHabitacionService],
})
export class TiposHabitacionModule {}