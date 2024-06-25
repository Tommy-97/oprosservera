import { Module } from '@nestjs/common';
import { PollingModule } from './PollingModule';  // Убедитесь, что путь верный

@Module({
  imports: [PollingModule],
})
export class AppModule {}
