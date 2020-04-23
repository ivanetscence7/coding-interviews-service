import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Interviewer } from '../models/Interviewer';
import { RegisterInterviewerDto } from '../dto/RegisterInterviewerDto';
import { InterviewerService } from './InterviewerService';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/LoginDto';
import { LoginDtoResponse } from '../dto/LoginDtoResponse';
import * as bcrypt from 'bcrypt';
import { ProfileService } from './ProfileService';

@Injectable()
export class AuthService {
  constructor(
    private interviewerService: InterviewerService,
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async registerInterviewer(registerInterviewerDto: RegisterInterviewerDto): Promise<LoginDtoResponse> {
    const interviewer = new Interviewer();

    this.setInterviewerParameters(interviewer, registerInterviewerDto);

    try {
      const response = await this.interviewerService.create(interviewer);

      await this.profileService.createEmptyProfile(interviewer);

      const token = await this.createToken(response);

      return {
        status: 'success',
        access_token: token,
        email: interviewer.email,
      };
    } catch (ex) {
      throw ex;
    }
  }

  async login(loginDto: LoginDto): Promise<LoginDtoResponse> {
    const user = await this.interviewerService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.checkCredentials(loginDto.password, user.password);

    const token = this.createToken(user);

    return {
      status: 'success',
      access_token: token,
      email: user.email,
    };
  }

  async checkCredentials(passwordRequest, passwordStorage) {
    const areEqual = await comparePasswords(passwordRequest, passwordStorage);
    if (!areEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return areEqual;
  }

  private createToken(interviewer: Interviewer) {
    return this.jwtService.sign({ email: interviewer.email });
  }

  setInterviewerParameters(interviewer: Interviewer, registerInterviewerDto: RegisterInterviewerDto) {
    interviewer.firstName = registerInterviewerDto.firstName;
    interviewer.lastName = registerInterviewerDto.lastName;
    interviewer.email = registerInterviewerDto.email;
    interviewer.password = registerInterviewerDto.password;
  }

  async validateUser(email: string): Promise<Interviewer> {
    const user = await this.interviewerService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}

export const comparePasswords = async (currentPassword, userPassword) => {
  return bcrypt.compare(currentPassword, userPassword);
};
