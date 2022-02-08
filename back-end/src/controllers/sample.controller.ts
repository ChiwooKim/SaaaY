import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { SampleService } from '../services/sample.service';

// TODO : https://docs.nestjs.com/controllers https://wikidocs.net/148192

@Controller('/sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  getTodos(@Res() res: Response) {
    res.status(HttpStatus.OK);
    const todos = this.sampleService.getTodos();
    // JSON 으로 바꿔서 httpStatus code 와 함께 알맞은 response 를 보낸다
    res.status(HttpStatus.OK).json(JSON.stringify(todos));
  }

  // json 으로 넘긴 form 을 params (이름은 바뀌어도 됨) 객체로 받기. 객체는 미리 선언해둬도 된다 (Model / Dto 생성)
  @Post()
  createTodo(@Body() params: { text: string }, @Res() res: Response) {
    // Resource 가 생성된다면 created 코드 (201)
    res.status(HttpStatus.CREATED).json({ message: 'Todo created!' });
  }

  // path variables 로 받기
  @Patch(':todoId')
  updateTodo(
    @Param('todoId') todoId: string,
    @Body() params: { text: string },
    @Res() res: Response,
  ) {
    console.log('updateTodo');

    console.log('id: ', todoId);

    this.sampleService.updateTodo(todoId, params.text);

    res.status(HttpStatus.OK).json({ message: 'Todo updated!' });
  }

  @Delete(':todoId')
  deleteTodo(@Param('todoId') todoId: string, @Res() res: Response) {
    console.log('deleteTodo');

    this.sampleService.deleteTodo(todoId);

    res.status(HttpStatus.OK).json({ message: 'Todo deleted!' });
  }
}
