import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importa el PrismaModule
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule, // Asegura que el PrismaService esté disponible
    JwtModule.register({
      secret: 'yourSecretKey', // Cambia esto por una clave secreta segura
      signOptions: { expiresIn: '1h' }, // Configuración del token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
