import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  testerService() {
    return { message: 'Test réussi' };
  }
}
