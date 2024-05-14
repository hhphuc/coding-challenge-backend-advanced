import { IAirdropDetails } from "../interfaces/airdropJob";
import { AirdropJobStore } from "../models/airdropJob";
import JobQueue from "../queue/job";

const AirdropController = {
  // Public
  airdropNFT: (data: IAirdropDetails) => {
    const jobQueue = JobQueue.getInstance();
    jobQueue.enqueue(JSON.stringify(data));
    return { success: true };
  },

  redeemNFT: ({ redeemCode }: { redeemCode: string }) => {
    const airdropJob = AirdropJobStore.getInstance();
    return airdropJob.markAsRedeemed(redeemCode);
  },

  // Admin only
  get: ({ redeemCode }: { redeemCode: string }) => {
    const airdropJob = AirdropJobStore.getInstance();
    return airdropJob.get(redeemCode);
  },

  getAll: (query: Partial<IAirdropDetails>) => {
    const airdropJob = AirdropJobStore.getInstance();
    return airdropJob.getAll(query);
  },

  update: ({
    redeemCode,
    data,
  }: {
    redeemCode: string;
    data: Partial<IAirdropDetails>;
  }) => {
    const airdropJob = AirdropJobStore.getInstance();
    return airdropJob.update(redeemCode, data);
  },

  delete: ({ redeemCode }: { redeemCode: string }) => {
    const airdropJob = AirdropJobStore.getInstance();
    return airdropJob.delete(redeemCode);
  },
};

export default AirdropController;
