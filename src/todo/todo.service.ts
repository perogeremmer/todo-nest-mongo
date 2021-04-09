import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';
import { Todo } from './interfaces/todo.interface'
import { InjectModel } from '@nestjs/mongoose';
import { TodoTransformer } from './transformers/todo.transformer';

@Injectable()
export class TodoService {

  constructor(@InjectModel('Todo') private TodoModel: Model<Todo>) { }

  async create(createTodoDto: CreateTodoDto): Promise<TodoTransformer> {
    let data = new this.TodoModel(createTodoDto)
    return TodoTransformer.singleTransform(await data.save())
  }

  async findAll(): Promise<TodoTransformer> {
    let data = await this.TodoModel.find()

    if (data.length < 1) {
      return []
    }

    return TodoTransformer.transform(data)
  }

  async findOne(id: string): Promise<TodoTransformer> {
    console.log(id)
    let data = await this.TodoModel.findById(id)

    if (!data) {
      throw new Error('Data not found!')
    }

    return TodoTransformer.singleTransform(data)
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoTransformer> {
    let data = await this.TodoModel.findByIdAndUpdate(id, updateTodoDto, { 'new': true })
    
    if (!data) {
      throw new Error("Todo is not found!")
    }

    return TodoTransformer.singleTransform(data)
  }

  async remove(id: string): Promise<String> {
    let data = await this.TodoModel.findByIdAndRemove(id)
    
    if (!data) {
      throw new Error("Todo is not found!")
    }

    return "Todo has been deleted!"
  }
}
