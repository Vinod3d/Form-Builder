import express from "express";
import { updateFormAnalytics } from "../controllers/formAnalyticsController.js";

const router = express.Router();

router.put("/form/:formId", updateFormAnalytics);

export default router;
