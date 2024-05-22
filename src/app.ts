import express, { Application, Request, Response, json } from "express";
import cors from "cors";
const app: Application = express();
const port = 3000;

app.use(json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Metro Deal server is running");
});

export default app;
