import express, { Express, Request, Response } from "express";
import jobRouter from "./routers/job";
import adminRouter from "./routers/admin";
import { errorHandling } from "./middlewares/errorHandling";

const app: Express = express();
const port = process.env.PORT || "8888";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/jobs", jobRouter);
app.use("/admin", adminRouter);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
