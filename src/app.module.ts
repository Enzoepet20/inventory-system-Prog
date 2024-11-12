import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    ProductsModule, 
    PrismaModule, // Agregado para la integración con Prisma
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
