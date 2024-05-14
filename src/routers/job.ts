import express from "express";
import { SuccessStatus } from "../utils/errors";
import AirdropController from "../controllers/airdrop";
import { validate } from "../middlewares/validation";
import { generateJobSchema, redeemJobSchema } from "../validations/job";
const jobRouter = express.Router();

jobRouter.post("/", validate(generateJobSchema), (req, res) => {
  const result = AirdropController.airdropNFT(req.body);
  res.status(SuccessStatus.CREATED).json(result);
});

jobRouter.put("/redeem/:redeemCode", validate(redeemJobSchema), (req, res) => {
  const result = AirdropController.redeemNFT({
    redeemCode: req.params.redeemCode,
  });
  res.status(SuccessStatus.OK).json(result);
});

export default jobRouter;
