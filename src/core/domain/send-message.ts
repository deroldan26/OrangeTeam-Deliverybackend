export interface SendMessage<T> {
    sendMessage(patron: string, data: T);
  }