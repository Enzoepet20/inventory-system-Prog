import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales del usuario.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Excluye la contraseña del resultado
    const { password: _, ...userData } = user;
    return userData;
  }

  /**
   * Genera un token de acceso JWT para el usuario autenticado.
   */
  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }

  /**
   * Registra un nuevo usuario con contraseña encriptada.
   */
  async register(createUserDto: { email: string; password: string; role?: string }) {
    // Verifica si el email ya está en uso
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Asigna un rol predeterminado si no se proporciona
    const userRole = createUserDto.role || 'RegularUser';

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crea el usuario
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        role: userRole,
      },
    });

    // Excluye la contraseña del resultado
    const { password, ...userData } = user;
    return userData;
  }
}
