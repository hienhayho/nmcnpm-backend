import { Module } from '@nestjs/common';
import { ServicesUsedService } from './services_used.service';
import { ServicesUsedController } from './services_used.controller';

@Module({
  controllers: [ServicesUsedController],
  providers: [ServicesUsedService]
})
export class ServicesUsedModule {}
