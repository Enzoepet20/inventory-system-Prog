import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegura que PrismaService esté disponible
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
