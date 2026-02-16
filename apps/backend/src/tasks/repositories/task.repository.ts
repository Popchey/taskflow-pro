import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from 'src/common/interfaces/repository.interface';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskRepository implements IRepository<Task> {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Task> {
    return this.repository.findOne({ where: { id } });
  }

  async create(entity: Task): Promise<Task> {
    return this.repository.save(entity);
  }

  async update(id: string, entity: Partial<Task>): Promise<Task> {
    await this.repository.update(id, entity);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
