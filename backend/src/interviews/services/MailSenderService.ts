import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SessionService } from './SessionService';
import { SendInviteDto } from '../dto/SendInviteDto';

@Injectable()
export class MailSenderService {
  private logger: Logger = new Logger('MailSenderService');

  constructor(private readonly mailerService: MailerService, private sessionService: SessionService) {}

  sendEmailToCandidate(inviteDto: SendInviteDto): Promise<void> {
    const currEmail = inviteDto.candidateEmail;
    const hashValue = inviteDto.sessionUuid;
    const link: string = process.env.BACKEND_URL + '/session/hash?uuid=' + hashValue;

    this.sessionService.create(inviteDto);

    return this.sendEmail(link, currEmail);
  }

  sendEmail(link: string, email: string): Promise<void> {
    return this.mailerService
      .sendMail({
        to: email,
        from: ' "Invitation: " <coding.interview.session@gmail.com>',
        subject: 'You are invited on interview ✔',
        html: link,
      })
      .then(success => {
        this.logger.log(success);
      })
      .catch(err => {
        this.logger.log(err);
      });
  }
}
