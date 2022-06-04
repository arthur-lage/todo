import { config } from "dotenv";

config();

import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user";
import { todoRoutes } from "./routes/todo";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
