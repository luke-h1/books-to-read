import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from './auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('auth/register')
  async register(@Body() body: RegisterDto) {
    const { password_confirm, ...data } = body;

    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed,
      isAdmin: false,
    });
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Get('auth/me')
  async user(@Req() request: Request) {
    const cookie = request.cookies.jwt;
    const { id } = await this.jwtService.verifyAsync(cookie);
    const user = await this.userService.findOne({ id });
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }

  @Put('auth/me/info')
  @UseGuards(AuthGuard)
  async updateInfo(
    @Req() request: Request,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
  ) {
    const cookie = request.cookies.jwt;
    const { id } = await this.jwtService.verifyAsync(cookie);

    await this.userService.update(id, {
      first_name,
      last_name,
      email,
    });
    return this.userService.findOne({ id });
  }

  @Put('auth/me/password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const cookie = request.cookies.jwt;
    const { id } = await this.jwtService.verifyAsync(cookie);

    await this.userService.update(id, {
      password: await bcrypt.hash(password, 10),
    });
    return this.userService.findOne({ id });
  }

  @Delete('auth/me')
  @UseGuards(AuthGuard)
  async delete(@Req() request: Request) {
    const cookie = request.cookies.jwt;

    const { id } = await this.jwtService.verifyAsync(cookie);
    await this.userService.delete(id);
    return {
      message: 'success',
    };
  }
}
