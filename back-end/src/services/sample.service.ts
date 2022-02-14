import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TestPhoto } from 'src/entity/samplephoto.entity';
import { TestPhotoMetadata } from 'src/entity/samplephotometadata.entity';
import { TestTodo } from 'src/entity/sampletodo.entity';
import { TestUser } from 'src/entity/sampleuser.entity';
import { Photo } from 'src/models/photo.dto';
import { Connection, Repository } from 'typeorm';

import { TodoDto } from '../models/todo.dto';

@Injectable()
export class SampleService {
  // 여기에는 DB 커넥션 객체
  private TODOS: TodoDto[] = [];
  private generateId = 0;

  constructor(
    @InjectRepository(TestTodo)
    private readonly todoRepository: Repository<TestTodo>,
    @InjectRepository(TestUser)
    private readonly userRepository: Repository<TestUser>,
    @InjectRepository(TestPhoto)
    private readonly photoRepository: Repository<TestPhoto>,
    @InjectRepository(TestPhotoMetadata)
    private readonly metaRepository: Repository<TestPhotoMetadata>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async findAllWithRawQuery() {
    return this.connection.query('SELECT * FROM test_user');
  }

  public async createSamplePhoto() {
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    return this.photoRepository.save(photo);
  }

  public async getAllPhotos(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  public async createPhotoMetadata(photoId: string) {
    const photo = await this.photoRepository.findOne(photoId);
    const metadata = new TestPhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = 'cybershoot';
    metadata.orientation = 'portrait';
    metadata.photo = photo;

    // await this.photoRepository.save(photo);
    await this.metaRepository.save(metadata);
  }

  public async getPhotoWithMetadata() {
    const photo = await this.photoRepository.find({
      relations: ['metadata'],
    });
    console.log(photo);
    const one = await this.photoRepository.findOne({
      relations: ['metadata'],
      where: {
        id: 1,
      },
    });
    console.log(one);
  }

  /**
   * User 조회
   * @param id
   */
  public async findUser(id: string): Promise<TestUser> {
    return this.userRepository.findOne(id);
  }
  /**
   * Todo 리스트 조회
   */
  public async findAll(): Promise<TestTodo[]> {
    return this.todoRepository.find();
  }
  /**
   * 특정 Todo 조회
   * @param id
   */
  public findOne(id: string): Promise<TestTodo> {
    return this.todoRepository.findOne(id);
  }
  /**
   * Todo 저장
   * @param todo
   * 저장할때는 todo 엔티티를 만들어서 넣어야 한다
   */
  public async saveOne(todo: TestTodo): Promise<void> {
    await this.todoRepository.save(todo);
  }
  /**
   * Todo 삭제
   */
  public async deleteOne(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
  // 이외에도 todoRepository 에 . 찍어보면 여러 메서드 확인 가능

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

  public findAllWithORM() {
    return this.userRepository.find();
  }

  public findOneWithORM(userId: string) {
    return this.userRepository.findOne(userId);
  }

  public createUserWithORM(user: { name: string }) {
    const userEntity = new TestUser();
    userEntity.name = user.name; // 엔티티 안 넣어도 되네요??
    return this.userRepository.save(user);
  }
}
