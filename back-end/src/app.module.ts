import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './entity/sample-user.entity';
import { TestTodo } from './entity/sample-todo.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entity/user.entity';
import { Oauth } from './entity/oauth.entity';
import { Role } from './entity/role.entity';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([TestUser]),
    TypeOrmModule.forFeature([TestTodo]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Oauth]),
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [
    AppController,
    SampleController,
    RoomController,
    AccountController,
    UserController,
  ],
  providers: [
    AppService,
    SampleService,
    RoomService,
    AccountService,
    UserService,
  ],
})
export class AppModule {}
