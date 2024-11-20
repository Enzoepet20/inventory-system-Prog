import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')  // Etiqueta para el grupo de endpoints
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener saludo' })
  @ApiResponse({ status: 200, description: 'Saludo exitoso' })
  getHello(): string {
    return this.appService.getHello();
  }
}
