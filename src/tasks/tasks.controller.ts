import { Body, Controller, Get, Post, Req } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  tab = [
    {
      id: 1,
      title: 'Project 0',
      description: 'My first project',
    },
  ];

  @Get('all')
  getAllTasks() {
    return this.tab;
  }

  @Post('new')
  addTask(@Req() request, @Body() body) {
    console.log(request, body);
    this.tab.push({
      id: this.tab[this.tab.length - 1].id + 1,
      ...body,
      //   title: body.title,
      //   description: body.description,
    });
    return { message: 'task added', tab: this.tab };
  }
}
