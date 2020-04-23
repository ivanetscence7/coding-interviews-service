import { Controller, Get, UseGuards } from '@nestjs/common';
import { InterviewerService } from '../services/InterviewerService';
import { Interviewer } from '../models/Interviewer';
import { GetUser } from '../decorator/GetUser';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/interviewer')
export class InterviewerController {
  constructor(private interviewerService: InterviewerService) {}

  @Get()
  @UseGuards(AuthGuard())
  getInterviewer(@GetUser() user: Interviewer) {
    return this.interviewerService.getInterviewerByEmail(user.email);
  }
}
