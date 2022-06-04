import { Request, Response } from "express";
import { pool } from "../database/db";
import { compare, hash } from "bcrypt";

const UserController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await pool.query("SELECT * FROM users");

      return res.status(200).json({ users: users.rows });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await pool.query(`SELECT * FROM users WHERE user_id='${id}'`);

      return res.status(200).json({ user: user.rows });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email or password fields are missing!" });
      }

      const userExists = await pool.query(
        `SELECT * FROM users WHERE email='${email}'`
      );

      if (userExists.rows.length > 0) {
        return res.status(409).json({ message: "User already exists!" });
      }

      const hashedPassword = await hash(password, 10);

      await pool.query(`INSERT INTO users (name, email, password) VALUES (
          '${name}',
          '${email}',
          '${hashedPassword}'
        )`);

      return res.status(200).json({ message: "User created successfully!" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email or password fields are missing!" });
      }

      const user = await pool.query(
        `SELECT * FROM users WHERE email='${email}'`
      );

      if (user.rows.length === 0) {
        return res.status(401).json({ message: "Email/password not found!" });
      }

      const decryptedPassword = await compare(password, user.rows[0].password);

      if (!decryptedPassword) {
        return res.status(401).json({ message: "Email/password not found!" });
      }

      return res.status(200).json({ message: "Login successful!" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      await pool.query(`DELETE FROM users`);

      return res.status(200).json({ message: "All users were deleted" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await pool.query(`DELETE FROM users WHERE user_id='${id}'`);

      return res
        .status(200)
        .json({ message: `User with id: ${id} was deleted successfully` });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
};

export { UserController };
