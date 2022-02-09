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
import { MemberController } from './controllers/member.controller';
import { MemberService } from './services/member.service';
import { Member } from './entity/member.entity';
import { Oauth } from './entity/oauth.entity';
import { Role } from './entity/role.entity';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([TestUser]),
    TypeOrmModule.forFeature([TestTodo]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Oauth]),
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [
    AppController,
    SampleController,
    RoomController,
    AccountController,
    MemberController,
  ],
  providers: [
    AppService,
    SampleService,
    RoomService,
    AccountService,
    MemberService,
  ],
})
export class AppModule {}
