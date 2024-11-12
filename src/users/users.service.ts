import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from './user-role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo usuario, validando si el correo ya existe.
   */
  async create(userDto: { email: string; password: string; role?: UserRole }) {
    const exists = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.prisma.user.create({
      data: {
        email: userDto.email,
        password: userDto.password,
        role: userDto.role || UserRole.RegularUser, // Rol por defecto
      },
    });

    // Excluye la contraseña del resultado
    const { password, ...result } = user;
    return result;
  }

  /**
   * Devuelve todos los usuarios registrados.
   */
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }

  /**
   * Busca un usuario por email.
   */
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Busca un usuario por ID.
   */
  async findById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Asigna un nuevo rol a un usuario.
   */
  async assignRole(userId: number, role: UserRole) {
    const user = await this.findById(userId);

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { role },
    });

    return updatedUser;
  }
}
