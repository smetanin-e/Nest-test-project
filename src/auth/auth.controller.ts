import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import type { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Создает новый аккаунт для пользователя',
  })
  @ApiBadRequestResponse({ description: 'Некорректные входные данные' })
  @ApiOkResponse({ type: AuthResponse })
  @ApiConflictResponse({
    description: 'Пользователь с такой почтой уже существует',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Вход в систему',
    description: 'Авторизует пользователя и выдает токен доступа',
  })
  @ApiBadRequestResponse({ description: 'Некорректные входные данные' })
  @ApiOkResponse({ type: AuthResponse })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Генерирует новый токен доступа',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({
    description: 'Недействительный refresh-token',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Выход из системы',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return { id };
  }
}
