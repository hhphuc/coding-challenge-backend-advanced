import {
  IAirdropBasic,
  IAirdropDetails,
  IAirdropJob,
} from "../interfaces/airdropJob";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { generateRedeemCode } from "../utils/redeemCode";

export class AirdropJobStore {
  private airdropJobs: IAirdropJob[];
  private static instance: AirdropJobStore;

  constructor() {
    this.airdropJobs = [];
  }

  static getInstance(): AirdropJobStore {
    if (!this.instance) {
      this.instance = new AirdropJobStore();
    }
    return this.instance;
  }

  private getUniqueRedeemCode(): string {
    let redeemCode = generateRedeemCode();
    while (this.isRedeemCodeExist(redeemCode)) {
      redeemCode = generateRedeemCode();
    }
    return redeemCode;
  }

  private isRedeemCodeExist(redeemCode: string): boolean {
    return !!this.airdropJobs.find((job) => job.redeemCode === redeemCode);
  }

  generate({
    contractAddress,
    recipient,
    quantity,
  }: IAirdropBasic): IAirdropJob {
    const redeemCode = this.getUniqueRedeemCode();

    const newJob: IAirdropJob = {
      redeemCode,
      contractAddress,
      quantity,
      recipient,
      redeemed: false,
    };
    this.airdropJobs.push(newJob);

    return newJob;
  }

  get(redeemCode: string): IAirdropJob | undefined {
    const job = this.airdropJobs.find((job) => job.redeemCode === redeemCode);

    if (!job) {
      throw new NotFoundError(`Redeem code ${redeemCode} not found`);
    }

    return job;
  }

  getAll(query: Partial<IAirdropDetails>): IAirdropJob[] {
    const { contractAddress, recipient, quantity, redeemed } = query;

    return this.airdropJobs.filter(
      (job) =>
        (!contractAddress || job.contractAddress === contractAddress) &&
        (!recipient || job.recipient === recipient) &&
        (typeof quantity !== "number" || job.quantity === quantity) &&
        (typeof redeemed !== "boolean" || job.redeemed === redeemed),
    );
  }

  update(
    redeemCode: string,
    data: Partial<IAirdropDetails>,
  ): IAirdropJob | undefined {
    const job = this.get(redeemCode) as IAirdropJob;

    for (const key in data) {
      const dataKey = key as keyof IAirdropDetails;
      const value = data[dataKey];

      if (value !== undefined) {
        job[dataKey] = value as never;
      }
    }

    return job;
  }

  delete(redeemCode: string): void {
    this.airdropJobs = this.airdropJobs.filter(
      (job) => job.redeemCode !== redeemCode,
    );
  }

  markAsRedeemed(redeemCode: string): void {
    const job = this.get(redeemCode) as IAirdropJob;

    if (job && job.redeemed === true) {
      throw new BadRequestError(`Redeem code ${redeemCode} already redeemed`);
    }

    job.redeemed = true;
  }
}
