import express from 'express';
import auth from '../middleware/auth.js';
import { addFolder, addForm, deleteFolder, deleteForm, getAllWorkspaces, getFolderById, getFormById, getFormsByFolderId, getMyWorkspace, updateForm } from '../controllers/workspaceController.js';
const router = express.Router();

router.get("/get", auth, getMyWorkspace);
router.get("/getall", auth, getAllWorkspaces);
router.post("/addfolder", auth, addFolder);
router.delete("/folder", auth, deleteFolder);
router.get("/folder/:id", auth, getFolderById);
router.post("/folder/addform", auth, addForm);
router.get("/folder/:fid/getforms", auth, getFormsByFolderId);
router.get("/folder/getform/:id", auth, getFormById);
router.delete("/folder/deleteform", auth, deleteForm);
router.patch("/folder/form/:formId", auth, updateForm);


export default router;