class MessageQueue {
  private queue: string[];

  constructor() {
    this.queue = [];
  }

  enqueue(message: string) {
    this.queue.push(message);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  processMessages() {}
}

export default MessageQueue;
