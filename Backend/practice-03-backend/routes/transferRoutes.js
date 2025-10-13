import express from "express";
import { transferFunds } from "../controllers/transferController.js";

const router = express.Router();

router.post("/transfer", transferFunds);

export default router;
