import express from 'express';
import auth from '../middleware/auth.js';
import { addFolder, addForm, deleteFolder, getAllWorkspaces, getFolderById, getMyWorkspace } from '../controllers/workspaceController.js';
const router = express.Router();

router.get("/get", auth, getMyWorkspace);
router.get("/getall", auth, getAllWorkspaces);
router.post("/addfolder", auth, addFolder);
router.post("/addform", auth, addForm);
router.get("/folder/:id", auth, getFolderById);
router.delete("/folder", auth, deleteFolder);


export default router;