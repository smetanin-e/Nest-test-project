import {
  createParamDecorator,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    return data ? user[data] : user;
  },
);
