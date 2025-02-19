import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TasksModule } from './tasks/tasks.module';

import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/db.sqlite',
      entities: [Task],
      synchronize: true,
      // logging: true,
    }),
    TasksModule,
  ],
})
export class AppModule { }
