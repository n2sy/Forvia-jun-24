import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './models/task';

@Controller('tasks')
export class TasksController {
  tab = [new Task('1', 'Project 0', 'My first project', 2024)];

  @Get('all')
  getAllTasks(@Res() response) {
    return response.json({ allTaks: this.tab });
  }

  @Get('search')
  searchAllTasks(
    @Res() response: Response,
    @Query('startYear', ParseIntPipe) y1,
    @Query('endYear', ParseIntPipe) y2,
  ) {
    console.log(y1, y2);

    let t = this.tab.filter((task) => task.year >= y1 && task.year <= y2);
    return response.status(200).json(t);
  }
  @Get(':id')
  getTaskById(@Param('id') id) {
    let task = this.tab.find((task) => task.id === id);
    if (task) return { task };
    else throw new NotFoundException('Task doesnt exist');
  }

  @Post('new')
  addTask(@Req() request, @Body() body) {
    console.log(request, body);
    this.tab.push(
      new Task(uuidv4(), body.title, body.description, body.year),

      //   title: body.title,
      //   description: body.description,
    );
    return { message: 'task added', tab: this.tab };
  }

  @Post('new/v2')
  addTask2(@Req() request, @Body('title') name, @Body('description') desc) {
    console.log(request);
    this.tab.push(
      new Task(uuidv4(), name, desc, 2024),

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
