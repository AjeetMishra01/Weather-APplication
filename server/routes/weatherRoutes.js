import express from "express";
import { getWeather, getHistory, toggleFavorite, deleteHistory } from "../controllers/weatherController.js";

const router = express.Router();

router.patch("/history/:id/favorite", toggleFavorite);
router.get("/history", getHistory);
router.delete("/history/:id", deleteHistory);
router.get("/:city", getWeather);


export default router;