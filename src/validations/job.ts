import * as yup from "yup";
import { ethAddressTest } from "./common";
import { REDEEM_CODE_LENGTH } from "../utils/redeemCode";

export const generateJobSchema = yup.object({
  body: yup.object({
    contractAddress: yup.string().test(ethAddressTest).required(),
    recipient: yup.string().test(ethAddressTest).required(),
    quantity: yup.number().strict().required(),
  }),
});

export const redeemJobSchema = yup.object({
  params: yup.object({
    redeemCode: yup.string().length(REDEEM_CODE_LENGTH).required(),
  }),
});

export const getAllJobsSchema = yup.object({
  query: yup.object({
    contractAddress: yup.string().test(ethAddressTest).optional(),
    recipient: yup.string().test(ethAddressTest).optional(),
    quantity: yup.number().strict().optional(),
    redeemed: yup.boolean().optional(),
  }),
});

export const getJobSchema = yup.object({
  params: yup.object({
    redeemCode: yup.string().length(REDEEM_CODE_LENGTH).required(),
  }),
});

export const updateJobSchema = yup.object({
  params: yup.object({
    redeemCode: yup.string().length(REDEEM_CODE_LENGTH).required(),
  }),
  body: yup.object({
    contractAddress: yup.string().test(ethAddressTest).optional(),
    recipient: yup.string().test(ethAddressTest).optional(),
    quantity: yup.number().strict().optional(),
    redeemed: yup.boolean().optional(),
  }),
});

export const deleteJobSchema = yup.object({
  params: yup.object({
    redeemCode: yup.string().length(REDEEM_CODE_LENGTH).required(),
  }),
});
