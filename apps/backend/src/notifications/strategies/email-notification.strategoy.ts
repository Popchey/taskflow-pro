/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from 'src/common/interfaces/notification-strategy.interface';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    // Logic to send email
    console.log(`Sending email to ${recipient}: ${message}`);
  }
}
