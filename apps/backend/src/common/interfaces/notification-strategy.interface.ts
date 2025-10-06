export interface NotificationStrategy {
  send(message: string, recipient: string): Promise<void>;
}
