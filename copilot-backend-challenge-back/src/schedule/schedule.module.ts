import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule as Schedule } from '@nestjs/schedule';

@Module({
  imports: [Schedule.forRoot()],
  providers: [ScheduleService],
})
export class ScheduleModule {}
