import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewerProfile } from '../models/InterviewerProfile';
import { ProfileController } from '../controllers/ProfileController';
import { ProfileService } from '../services/ProfileService';
import { AuthSpecificModule } from './AuthSpecificModule';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewerProfile]), AuthSpecificModule],
  controllers: [ProfileController],
  providers: [AuthSpecificModule, ProfileService],
  exports: [AuthSpecificModule, ProfileService],
})
export class ProfileModule {}
