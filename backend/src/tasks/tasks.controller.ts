import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAllTasks() {
        return this.tasksService.findAll();
    }
    @Get(':id')
    getOneTask(@Param('id') id: number) {
        return this.tasksService.findOne(id);
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number) {
        return this.tasksService.delete(id);
    }
    @Put(':id')
    async updateTask(@Param('id') id: number, @Body() updateTaskDto: Task): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto);
    }
}
