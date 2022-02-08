import { RequestHandler } from 'express';

import { SampleService } from '../services/sample.service';

const sampleService = new SampleService();

export const createTodo: RequestHandler = (req, res, next) => {
  console.log('createTodo');
  const text = (req.body as { text: string }).text;

  const newTodo = sampleService.createTodo(text);

  res.status(201).json({ message: 'Created the todo.', createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  console.log('getTodos');
  const todos = sampleService.getTodos();
  res.json({ todos: todos });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log('updateTodo');
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  console.log('id: ', todoId);

  const updatedTodo = sampleService.updateTodo(todoId, updatedText);

  res.json({ message: 'Updated!', updatedTodo: updatedTodo });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log('deleteTodo');
  const todoId = req.params.id;

  sampleService.deleteTodo(todoId);

  res.json({ message: 'Todo deleted!' });
};
