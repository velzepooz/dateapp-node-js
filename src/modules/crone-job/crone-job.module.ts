import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CroneJobService } from './crone-job.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CroneJobService],
})
export class CroneJobModule {}
