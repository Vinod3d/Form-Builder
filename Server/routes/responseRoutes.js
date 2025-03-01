import express from 'express';
import auth from '../middleware/auth.js';
import { createResponse, getResponsesByFormId } from '../controllers/responseController.js';
const router = express.Router();

router.post("/create", createResponse);
router.get("/getall/:formId",  getResponsesByFormId);

export default router;