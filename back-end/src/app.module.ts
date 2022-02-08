import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
@Module({
  imports: [],
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService],
})
export class AppModule {}
