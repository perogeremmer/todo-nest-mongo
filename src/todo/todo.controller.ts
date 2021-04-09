import { Controller, Get, Post, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AppResponse } from 'src/response.base';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(@Res() res, @Body() createTodoDto: CreateTodoDto) {
    try {
      let data = await this.todoService.create(createTodoDto)
      return AppResponse.ok(res, data, "Success create todo!")
    } catch (e) {
      return AppResponse.badRequest(res, "", e.message)
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      let data = await this.todoService.findAll();
      return AppResponse.ok(res, data)
    } catch (e) {
      return AppResponse.badRequest(res, "", e.message)
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      let data = await this.todoService.findOne(id);
      return AppResponse.ok(res, data)
    } catch (e) {
      return AppResponse.badRequest(res, "", e.message)
    }
  }

  @Put(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      let data = await this.todoService.update(id, updateTodoDto);
      return AppResponse.ok(res, data, "Todo has been updated!")
    } catch (e) {
      return AppResponse.badRequest(res, "", e.message)
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      let data = await this.todoService.remove(id);
      return AppResponse.ok(res, "", data)
    } catch (e) {
      return AppResponse.badRequest(res, "", e.message)
    }
  }
}
