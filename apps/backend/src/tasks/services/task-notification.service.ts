/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { EmailService } from '../../email/email.service';

@Injectable()
export class TaskNotificationService {
  constructor(private emailService: EmailService) {}

  async notifyAsignee(task: Task): Promise<void> {
    await this.emailService.send({
      to: task.assignee?.email ?? '',
      subject: `New Task Assigned: ${task.title}`,
      template: 'task-assigned',
      context: { task },
    });
  }
}
