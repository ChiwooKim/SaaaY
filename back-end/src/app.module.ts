import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './entity/user.entity';
import { TestTodo } from './entity/todo.entity';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([TestUser]),
    TypeOrmModule.forFeature([TestTodo]),
  ],
  controllers: [
    AppController,
    SampleController,
    RoomController,
    AccountController,
  ],
  providers: [AppService, SampleService, RoomService, AccountService],
})
export class AppModule {}
