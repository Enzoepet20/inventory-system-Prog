import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegura que PrismaService esté disponible
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
