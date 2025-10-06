import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      createdById: userId,
      assigneeId: createTaskDto.assigneeId || userId,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: ['assignee', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['assignee', 'createdBy'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async findByAssignee(assigneeId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { assigneeId },
      relations: ['assignee', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
