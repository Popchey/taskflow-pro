/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from 'src/common/interfaces/notification-strategy.interface';

@Injectable()
export class SmsNotificationStrategy implements NotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    // SMS sending logic
    console.log(`Sending SMS to ${recipient}: ${message}`);
  }
}
