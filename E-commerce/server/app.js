import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

export default app;