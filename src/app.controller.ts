import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('meriem')
  getHello(): string {
    return 'Forvia';
  }
}
