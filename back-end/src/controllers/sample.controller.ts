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
import { TestTodo } from 'src/entity/sampletodo.entity';
import { TestUser } from 'src/entity/sampleuser.entity';
import { TodoDto } from 'src/models/todo.dto';

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

  // typeorm 사용 예시
  @Get('/todo')
  getTodosByTypeorm(@Res() res: Response) {
    // Promise 로 반환되는데 이런식으로 then, catch 문으로 사용 가능
    this.sampleService
      .findAll()
      .then((todos) => {
        console.log(todos);
        res.status(HttpStatus.OK).json(todos);
      })
      .catch((err) => {
        console.log(err);
        res.status(HttpStatus.BAD_REQUEST);
      });
  }

  @Post('/todo/:userId')
  postTodosByTypeorm(@Body() todoDto: TodoDto, @Res() res: Response) {
    const newTodo = new TestTodo();
    newTodo.todo = 'request 에서 받아온 데이터'; // todo 저장 (사용자가 http 로 요청한 데이터를 넣는다)
    this.sampleService
      .findUser('1') // 유저 엔티티를 가져옴
      .then((user) => {
        console.log(user);
        newTodo.user = user; // todo 의 user 에는 조회한 user 를 세팅
        this.sampleService.saveOne(newTodo);
        console.log('new todo saved');
        res.status(HttpStatus.OK).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(HttpStatus.BAD_GATEWAY);
      });
  }

  @Get('/query')
  getAllWithQuery(@Res() res: Response) {
    this.sampleService.findAllWithRawQuery().then((users) => {
      console.log(users);
      res.status(HttpStatus.OK).json(users);
    });
  }

  @Get('/orm')
  getAllWithORM(@Res() res: Response) {
    this.sampleService.findAllWithORM().then((users) => {
      console.log(users);
      res.status(HttpStatus.OK).json(users);
    });
  }

  @Get('/orm/:userId')
  getOneWithORM(@Param('userId') userId: string, @Res() res: Response) {
    this.sampleService.findOneWithORM(userId).then((users) => {
      console.log(users);
      res.status(HttpStatus.OK).json(users);
    });
  }

  @Post('/orm')
  postUser(@Body() user: { name: string }, @Res() res: Response) {
    this.sampleService.createUserWithORM(user).then(() => {
      res.status(HttpStatus.OK).send();
    });
  }

  @Post('/photo')
  createSamplePhoto(@Res() res: Response) {
    this.sampleService.createSamplePhoto().then(() => {
      res.status(HttpStatus.OK).send();
    });
  }

  @Get('photo')
  getAllPhotos(@Res() res: Response) {
    this.sampleService.getAllPhotos().then((photos) => {
      res.status(HttpStatus.OK).json(photos);
    });
  }

  @Post('/photo/:photoId/meta')
  createPhotoMetadata(@Param('photoId') photoId, @Res() res: Response) {
    this.sampleService.createPhotoMetadata(photoId).then(() => {
      res.status(HttpStatus.OK).send();
    });
  }
}
