import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './entity/sampleuser.entity';
import { TestTodo } from './entity/sampletodo.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entity/user.entity';
import { Oauth } from './entity/oauth.entity';
import { Role } from './entity/role.entity';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { ScheduleService } from './services/schedule.service';
import { ScheduleController } from './controllers/schedule.controller';
import { TestPhoto } from './entity/samplephoto.entity';
import { TestPhotoMetadata } from './entity/samplephotometadata.entity';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([TestUser]),
    TypeOrmModule.forFeature([TestTodo]),
    TypeOrmModule.forFeature([TestPhoto]),
    TypeOrmModule.forFeature([TestPhotoMetadata]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Oauth]),
    TypeOrmModule.forFeature([Role]),
    AuthModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [
    AppController,
    SampleController,
    RoomController,
    AccountController,
    UserController,
    ScheduleController,
  ],
  providers: [
    AppService,
    SampleService,
    RoomService,
    AccountService,
    UserService,
    ScheduleService,
  ],
})
export class AppModule {}
