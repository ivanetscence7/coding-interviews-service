import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { SessionService } from '../services/SessionService';
import { SendInviteDto } from '../dto/SendInviteDto';
import { Session } from '../models/Session';

@Controller('api/session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get('hash')
  @Redirect(process.env.FRONTEND_URL + '/login', 302)
  public async startSession(@Query('uuid') uuid) {
    const result = await this.sessionService.findByUUID(uuid);
    if (result) {
      await this.sessionService.deleteInterview(uuid);
      return { url: process.env.FRONTEND_URL + '/editor/' + result.uuid };
    }
  }

  @Get(':uuid')
  public getInterviewProblem(@Param('uuid') uuid: string): Promise<Session> {
    return this.sessionService.getInterviewProblem(uuid);
  }

  @Get('uuid/:email')
  public async getUuidByEmail(@Param('email') email: string): Promise<Session> {
    return this.sessionService.getUuidByEmail(email);
  }
}
