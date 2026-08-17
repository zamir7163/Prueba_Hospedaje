import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TiposHabitacionModule } from './tipos-habitacion/tipos-habitacion.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { HuespedesModule } from './huespedes/huespedes.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    TiposHabitacionModule,
    HabitacionesModule,
    HuespedesModule,
    ReservasModule,
  ],
})
export class AppModule {}