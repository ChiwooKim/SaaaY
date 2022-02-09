import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
@Module({
  imports: [],
  controllers: [AppController, SampleController, RoomController],
  providers: [AppService, SampleService, RoomService],
})
export class AppModule {}
