import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async findOne(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id }, });
        if (!task) {
            throw new Error('Task not found');
        }
        return task
    }
    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    create(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(newTask);
    }

    async delete(id: number): Promise<void> {
        await this.taskRepository.delete(id);

    }

    async updateTask(id: number, updateTaskDto: Task): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id }, });
        if (!task) {
            throw new Error('Task not found');
        }

        // Atualizando as propriedades da tarefa, incluindo assignee
        task.title = updateTaskDto.title;
        task.description = updateTaskDto.description;
        task.dueDate = updateTaskDto.dueDate;
        task.priority = updateTaskDto.priority;
        task.assignee = updateTaskDto.assignee;

        // Salvando as alterações
        return this.taskRepository.save(task);
    }
}
