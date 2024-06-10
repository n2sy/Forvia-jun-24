import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './models/task';

@Controller('tasks')
export class TasksController {
  tab = [new Task('1', 'Project 0', 'My first project')];

  @Get('all')
  getAllTasks() {
    return this.tab;
  }
  @Get(':id')
  getTaskById(@Param('id') id) {
    return this.tab.find((task) => task.id === id);
  }

  @Post('new')
  addTask(@Req() request, @Body() body) {
    console.log(request, body);
    this.tab.push(
      new Task(uuidv4(), body.title, body.description),

      //   title: body.title,
      //   description: body.description,
    );
    return { message: 'task added', tab: this.tab };
  }

  @Post('new/v2')
  addTask2(@Req() request, @Body('title') name, @Body('description') desc) {
    console.log(request);
    this.tab.push(
      new Task(uuidv4(), name, desc),

      //   title: body.title,
      //   description: body.description,
    );
    return { message: 'task added', tab: this.tab };
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id) {
    let i = this.tab.findIndex((task) => task.id == id);
    if (i == -1) throw new NotFoundException("Task doesn't exist");
    this.tab.splice(i, 1);
    return { message: 'Task Successfully Deleted', tab: this.tab };
  }
}
