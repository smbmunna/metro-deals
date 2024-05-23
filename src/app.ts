import express, { Application, Request, Response, json } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();
const port = 3000;

app.use(json());
app.use(cors());

app.use("/api/products", ProductRoutes);

app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Metro Deal server is running");
});

export default app;
