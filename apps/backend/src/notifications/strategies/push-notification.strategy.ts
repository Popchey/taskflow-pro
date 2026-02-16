/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class PushNotificationStrategy {
  async send(message: string, recipient: string): Promise<void> {
    // Push notification sending logic
    console.log(`Sending push notification to ${recipient}: ${message}`);
  }
}

// Liskov Substitution Principle
// Derived classes must be substitutable for their base classes

abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  calculateArea(): number {
    return this.side * this.side;
  }
}
// Interface Segregation Principle
// Clients should not depend on interfaces they don't use

interface Readable {
  read(): Promise<any>;
}

interface Writable {
  write(data: any): Promise<void>;
}

interface Deletable {
  delete(): Promise<void>;
}

// A service can implement only what it needs
@Injectable()
export class ReadOnlyTaskService implements Readable {
  async read(): Promise<any> {
    // Read implementation
  }
}

@Injectable()
export class FullTaskService implements Readable, Writable, Deletable {
  async read(): Promise<any> {
    // Read implementation
  }

  async write(data: any): Promise<void> {
    // Write implementation
  }

  async delete(): Promise<void> {
    // Delete implementation
  }
}
