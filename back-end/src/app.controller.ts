import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { TodoDto } from './models/todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserDto } from './models/user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sampleService: SampleService,
    private readonly authService: AuthService,
  ) {}

  @Get('/sample')
  getSample(): TodoDto[] {
    return this.sampleService.getTodos();
  }

  @Post('/sample')
  createTodo(@Body() params: { text: string }): TodoDto {
    console.log(params.text);
    return this.sampleService.createTodo(params.text);
  }
}
