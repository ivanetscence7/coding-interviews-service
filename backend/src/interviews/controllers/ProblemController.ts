import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProblemService } from '../services/ProblemService';
import { Problem } from '../models/Problem';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorator/GetUser';
import { Interviewer } from '../models/Interviewer';
import { ProblemDto } from '../dto/ProblemDto';

@Controller('api/problems')
export class ProblemController {
  constructor(private problemService: ProblemService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: Interviewer): Promise<Problem[]> {
    return this.problemService.findByInterviewer(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() problemDto: ProblemDto, @GetUser() user: Interviewer): Promise<Problem> {
    return this.problemService.create(problemDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: number, @GetUser() user: Interviewer): Promise<void> {
    return this.problemService.delete(id, user);
  }

  @Put()
  @UseGuards(AuthGuard())
  update(@Body() problemDto: ProblemDto, @GetUser() user: Interviewer): Promise<Problem> {
    return this.problemService.update(problemDto, user);
  }
}
