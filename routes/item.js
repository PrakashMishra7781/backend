import { Router } from "express";
const router = Router();
import pool from "../config/db.js";
import { compare, hash } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
import authenticateToken from "../middleware/auth.js";

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      "SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  console.log("Received request body:", req.body);
  const user_id = req.user.id;

  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO items (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating item", details: err.message });
  }
});

// ✅ PUT update item (Protected)
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const user_id = req.user.id; // ✅ Get user ID

  try {
    const result = await pool.query(
      "UPDATE items SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, id, user_id] // ✅ Added `user_id` condition
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found or unauthorized" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// ✅ DELETE item (Protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id; // ✅ Get user ID

  try {
    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, user_id] // ✅ Added `user_id` condition
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found or unauthorized" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

export default router;
