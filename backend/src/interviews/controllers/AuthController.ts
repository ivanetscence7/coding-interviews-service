import { Body, Controller, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { RegisterInterviewerDto } from '../dto/RegisterInterviewerDto';
import { LoginDto } from '../dto/LoginDto';
import { LoginDtoResponse } from '../dto/LoginDtoResponse';
import { HttpExceptionFilter } from '../exceptionfilter/HttpExceptionFilter';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseFilters(HttpExceptionFilter)
  async registerInterviewer(@Body() registerInterviewerDto: RegisterInterviewerDto): Promise<LoginDtoResponse> {
    return this.authService.registerInterviewer(registerInterviewerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginDtoResponse> {
    return await this.authService.login(loginDto);
  }
}
