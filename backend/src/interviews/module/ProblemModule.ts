import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from '../models/Problem';
import { ProblemController } from '../controllers/ProblemController';
import { ProblemService } from '../services/ProblemService';
import { AuthSpecificModule } from './AuthSpecificModule';

@Module({
  imports: [TypeOrmModule.forFeature([Problem]), AuthSpecificModule],
  controllers: [ProblemController],
  providers: [AuthSpecificModule, ProblemService],
  exports: [AuthSpecificModule, ProblemService],
})
export class ProblemModule {}
