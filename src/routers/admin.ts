import express from "express";
import { SuccessStatus } from "../utils/errors";
import AirdropController from "../controllers/airdrop";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validation";
import {
  deleteJobSchema,
  getAllJobsSchema,
  getJobSchema,
  updateJobSchema,
} from "../validations/job";
const adminRouter = express.Router();

adminRouter.use(auth);

adminRouter.get("/jobs", validate(getAllJobsSchema), (req, res) => {
  const result = AirdropController.getAll(req.query);
  res.status(SuccessStatus.OK).json(result);
});

adminRouter.get("/jobs/:redeemCode", validate(getJobSchema), (req, res) => {
  const result = AirdropController.get({ redeemCode: req.params.redeemCode });
  res.status(SuccessStatus.OK).json(result);
});

adminRouter.put("/jobs/:redeemCode", validate(updateJobSchema), (req, res) => {
  const result = AirdropController.update({
    redeemCode: req.params.redeemCode,
    data: req.body,
  });
  res.status(SuccessStatus.OK).json(result);
});

adminRouter.delete(
  "/jobs/:redeemCode",
  validate(deleteJobSchema),
  (req, res) => {
    AirdropController.delete({ redeemCode: req.params.redeemCode });
    res.status(SuccessStatus.OK).send();
  },
);

export default adminRouter;
