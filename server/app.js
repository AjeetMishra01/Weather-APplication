import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import weatherRoutes from "./routes/weatherRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

connectDB();
const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("hello world")
})


app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
