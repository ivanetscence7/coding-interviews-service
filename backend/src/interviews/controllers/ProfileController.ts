import { Body, Controller, Get, Post, Param, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ProfileService } from '../services/ProfileService';
import { InterviewerProfile } from '../models/InterviewerProfile';
import { CreateProfileDto } from '../dto/CreateProfileDto';
import { AuthGuard } from '@nestjs/passport';
import { Interviewer } from '../models/Interviewer';
import { GetUser } from '../decorator/GetUser';

@Controller('api/profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Put()
  @UseGuards(AuthGuard())
  create(@Body() createProfileDto: CreateProfileDto, @GetUser() user: Interviewer): Promise<InterviewerProfile> {
    return this.profileService.editProfile(createProfileDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: Interviewer) {
    return this.profileService.getProfileInfo(user);
  }
}
