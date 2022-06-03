import { config } from "dotenv";

config();

import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user";
import { todoRoutes } from "./routes/todo";
import { pool } from "./db/db";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res)
  pool.end()
})

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
