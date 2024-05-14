import { AirdropJobStore } from "./airdropJob";
import { BadRequestError, NotFoundError } from "../utils/errors";

describe("AirdropJobStore", () => {
  let store: AirdropJobStore | undefined;

  beforeEach(() => {
    store = new AirdropJobStore();
  });

  afterEach(() => {
    store = undefined;
  });

  describe("generate", () => {
    it("should generate airdrop job", () => {
      const job = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 10,
      });

      expect(job).toHaveProperty("redeemCode");
      expect(job.contractAddress).toBe("0x123");
      expect(job.recipient).toBe("0x321");
      expect(job.quantity).toBe(10);
      expect(job.redeemed).toBe(false);
    });
  });

  describe("get", () => {
    it("should get exist job", () => {
      const createdJob = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 10,
      });

      const job = store!.get(createdJob.redeemCode);

      expect(job!.redeemCode).toBe(createdJob.redeemCode);
      expect(job!.contractAddress).toBe("0x123");
      expect(job!.recipient).toBe("0x321");
      expect(job!.quantity).toBe(10);
      expect(job!.redeemed).toBe(false);
    });

    it("should throw NotFoundError when getting non-existent job", () => {
      expect(() => {
        store!.get("non-existent-redeem-code");
      }).toThrow(NotFoundError);
    });
  });

  describe("getAll", () => {
    it("should get all matching airdrop jobs", () => {
      const job1 = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 10,
      });

      const job2 = store!.generate({
        contractAddress: "0x456",
        recipient: "0x654",
        quantity: 20,
      });

      const job3 = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 30,
      });

      store!.markAsRedeemed(job1.redeemCode);

      const allJobs1 = store!.getAll({ contractAddress: "0x123" });
      const allJobs2 = store!.getAll({ recipient: "0x654" });
      const allJobs3 = store!.getAll({ quantity: 20 });
      const allJobs4 = store!.getAll({ redeemed: true });

      expect(allJobs1).toHaveLength(2);
      expect(allJobs1).toContainEqual(job1);
      expect(allJobs1).toContainEqual(job3);

      expect(allJobs2).toHaveLength(1);
      expect(allJobs2).toContainEqual(job2);

      expect(allJobs3).toHaveLength(1);
      expect(allJobs3).toContainEqual(job2);

      expect(allJobs4).toHaveLength(1);
      expect(allJobs4).toContainEqual(job1);
    });

    it("should return an empty array if no matching jobs are found", () => {
      const allJobs = store!.getAll({ contractAddress: "0x789" });

      expect(allJobs).toHaveLength(0);
    });
  });

  describe("update", () => {
    it("should update all fields", () => {
      const createdJob = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 10,
      });

      const updatedJob = store!.update(createdJob.redeemCode, {
        contractAddress: "0x456",
        recipient: "0x654",
        quantity: 20,
        redeemed: true,
      });

      expect(updatedJob!.contractAddress).toBe("0x456");
      expect(updatedJob!.recipient).toBe("0x654");
      expect(updatedJob!.quantity).toBe(20);
      expect(updatedJob!.redeemed).toBe(true);
    });

    it("should update some of fields", () => {
      const createdJob = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 10,
      });

      const updatedJob = store!.update(createdJob.redeemCode, {
        contractAddress: "0x456",
        quantity: 20,
      });

      expect(updatedJob!.contractAddress).toBe("0x456");
      expect(updatedJob!.recipient).toBe("0x321");
      expect(updatedJob!.quantity).toBe(20);
      expect(updatedJob!.redeemed).toBe(false);
    });

    it("should throw NotFoundError when updating non-existent job", () => {
      expect(() => {
        store!.get("non-existent-redeem-code");
      }).toThrow(NotFoundError);
    });
  });

  describe("delete", () => {
    it("should delete existent job", () => {
      const createdJob = store!.generate({
        contractAddress: "0x123",
        recipient: "0x321",
        quantity: 10,
      });

      expect(store!.getAll({})).toHaveLength(1);

      store!.delete(createdJob.redeemCode);

      expect(store!.getAll({})).toHaveLength(0);
    });

    it("should throw NotFoundError when deleting non-existent job", () => {
      expect(() => {
        store!.get("non-existent-redeem-code");
      }).toThrow(NotFoundError);
    });
  });
});
