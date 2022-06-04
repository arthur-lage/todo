import { Request, Response } from "express";
import { pool } from "../database/db";

const TodoController = {
  async getAll(req: Request, res: Response) {
    try {
      const todos = await pool.query("SELECT * FROM todos");

      return res.status(200).json({ todos: todos.rows });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async getByUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const todos = await pool.query(
        `SELECT * FROM todos WHERE user_id='${id}'`
      );

      return res.status(200).json({ todos: todos.rows });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { user_id, todo } = req.body;

      await pool.query(`
            INSERT INTO todos (user_id, todo, is_completed)
                VALUES (
                    '${user_id}',
                    '${todo}',
                    false
                )
        `);

      return res.status(200).json({ message: "Todo created" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async complete(req: Request, res: Response) {
    try {
      const { todo_id } = req.params;

      const todoCurrentStatus = await pool.query(
        `SELECT is_completed FROM todos WHERE todo_id='${todo_id}'`
      );

      let isTodoComplete;

        console.log(todoCurrentStatus.rows[0])

      if (todoCurrentStatus.rows[0].is_completed == true) {
        await pool.query(
          `UPDATE todos SET is_completed = false WHERE todo_id='${todo_id}'`
        );
        isTodoComplete = false;
      } else {
        await pool.query(
          `UPDATE todos SET is_completed = true WHERE todo_id='${todo_id}'`
        );
        isTodoComplete = true;
      }

      return res
        .status(200)
        .json({ isTodoComplete, message: `Todo is now ${isTodoComplete}` });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      await pool.query(`DELETE FROM todos WHERE user_id='${user_id}'`);

      return res
        .status(200)
        .json({ message: "All todos were deleted successfully!" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
      const { todo_id } = req.params;
      const { user_id } = req.body;

      await pool.query(
        `DELETE FROM todos WHERE todo_id='${todo_id}'`
      );

      return res
        .status(200)
        .json({
          message: "Todo with id " + todo_id + " was deleted successfully!",
        });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
};

export { TodoController };
