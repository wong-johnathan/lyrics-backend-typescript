import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import routes from "./routes";

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/health", (req, res) => res.send("Health Check"));
app.get("/", (req, res) => res.send("⚡️ Express + TypeScript Server"));
app.use(routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
