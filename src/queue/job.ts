import { IAirdropBasic } from "../interfaces/airdropJob";
import { AirdropJobStore } from "../models/airdropJob";
import MessageQueue from "./queue";

class JobQueue extends MessageQueue {
  private static instance: JobQueue | undefined;

  constructor() {
    super();
    this.processMessages();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new JobQueue();
    }
    return this.instance;
  }

  processMessages() {
    setInterval(() => {
      if (!this.isEmpty()) {
        const message = this.dequeue();
        if (!message) {
          return;
        }

        const data = JSON.parse(message) as IAirdropBasic;
        const airdropJob = AirdropJobStore.getInstance();
        return airdropJob.generate(data);
      }
    }, 50);
  }
}

export default JobQueue;
