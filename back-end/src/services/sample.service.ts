import { Injectable } from '@nestjs/common';

import { TodoDto } from '../models/todo.dto';

@Injectable()
export class SampleService {
  // 여기에는 DB 커넥션 객체
  private TODOS: TodoDto[] = [];
  private generateId = 0;

  public createTodo(text: string): TodoDto {
    const newTodo = new TodoDto(this.generateId.toString(), text);
    console.log(newTodo);
    this.generateId++;
    this.TODOS.push(newTodo);
    return newTodo;
  }

  public getTodos(): TodoDto[] {
    console.log(this.TODOS);
    return this.TODOS;
  }

  public updateTodo(id: string, text: string): TodoDto {
    console.log('service id : ', id);
    console.log(this.TODOS);
    const newTodo = new TodoDto(this.generateId.toString(), text);
    this.TODOS.push(newTodo);
    console.log(this.TODOS);
    // const todoIndex = this.TODOS.findIndex((todo) => {
    //   console.log('todo id : ', todo.id);
    //   return todo.id === id;
    // });

    // if (todoIndex < 0) {
    //   throw new Error('Could not find todo!');
    // }

    // this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, text);

    // return this.TODOS[todoIndex];
    return newTodo;
  }

  public deleteTodo(id: string): void {
    console.log(this.TODOS);
    const todoIndex = this.TODOS.findIndex((todo) => todo.id === id);

    if (todoIndex < 0) {
      throw new Error('Could not find todo!');
    }

    this.TODOS.splice(todoIndex, 1);
  }
}
