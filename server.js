import express, { json } from "express";
import cors from "cors";
import itemsRouter from "./routes/item.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Make sure this matches frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add Authorization here!
    credentials: true,
  })
);

app.use(json());

app.use("/api/items", itemsRouter);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
