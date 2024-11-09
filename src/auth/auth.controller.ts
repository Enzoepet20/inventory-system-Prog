// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto) {
    // Lógica para registrar un usuario
  }

  @Post('login')
  async login(@Body() loginDto) {
    // Lógica para iniciar sesión y devolver un JWT
  }
}
