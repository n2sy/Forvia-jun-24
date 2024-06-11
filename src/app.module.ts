import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './first/first.middleware';
import { SecondMiddleware } from './second/second.middleware';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecondMiddleware, FirstMiddleware)
      .forRoutes({ path: 'tasks*', method: RequestMethod.GET });

    // consumer.apply(SecondMiddleware).forRoutes('');
  }
}
