import { CandidateService } from '../services/CandidateService';
import { CreateCandidateDto } from '../dto/CreateCandidateDto';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Candidate } from '../models/Candidate';
import { SendInviteDto } from '../dto/SendInviteDto';
import { MailSenderService } from '../services/MailSenderService';

@Controller('api/candidates')
export class CandidateController {
  constructor(private candidateService: CandidateService, private senderService: MailSenderService) {}

  @Get()
  findAll(): Promise<Candidate[]> {
    return this.candidateService.findAll();
  }

  @Post()
  create(@Body() candidateDto: CreateCandidateDto): Promise<Candidate> {
    return this.candidateService.create(candidateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.candidateService.delete(id);
  }

  @Post('invite')
  inviteCandidate(@Body() sendEmailDto: SendInviteDto): Promise<void> {
    return this.senderService.sendEmailToCandidate(sendEmailDto);
  }
}
