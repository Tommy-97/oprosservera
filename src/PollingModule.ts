import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { PollingService } from './PollingService';  // Ensure this path is correct
import { GlobalExceptionsFilter } from './global-exceptions.filter';  // Ensure this path is correct


@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [
    PollingService,
    {
      provide: 'EXCEPTION_FILTER',
      useClass: GlobalExceptionsFilter,
    },
  ],
})
export class PollingModule {}
