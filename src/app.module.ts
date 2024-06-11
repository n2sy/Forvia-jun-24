import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './first/first.middleware';
import { SecondMiddleware } from './second/second.middleware';
import { TasksModule } from './tasks/tasks.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'forviabook',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
  ],
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
