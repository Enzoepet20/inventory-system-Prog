import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserRole } from './user-role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.SuperAdmin)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SuperAdmin)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post('assign-role')
  @Roles(UserRole.SuperAdmin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async assignRole(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('role') role: UserRole,
  ) {
    return this.usersService.assignRole(userId, role);
  }
}
