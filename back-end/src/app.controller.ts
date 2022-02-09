import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { TodoDto } from './models/todo.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sampleService: SampleService,
  ) {}

  // @Get()
  // async getHello(): Promise<string> {
  //   const greeting = await this.appService.getHello()
  //   return greeting
  // }

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
