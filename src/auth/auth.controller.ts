import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() request: Request) {
    return request.user; //a dynamic user object is attached to the request by passport, which is the jwt
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request) {
    return request.user;
  }

  @Post('signup')
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('protected')
  @Roles('Admin')
  @UseGuards(JwtAuthGuard)
  async protectedRoute() {
    return 'This route is protected and only accessible by Admins';
  }
}
