import Workspace from "../models/workspaceSchema.js";
import Folder from "../models/folderSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import Form from "../models/formSchema.js";

export const getAllWorkspaces = async (req, res, next) => {
  try {
    const workspaces = await Workspace.find();

    if (!workspaces || workspaces.length === 0) {
      return res.status(404).json({ message: "No workspaces found" });
    }

    res.status(200).json(workspaces);
  } catch (error) {
    next(error);
  }
};

export const getMyWorkspace = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const workspace = await Workspace.findOne({ ownerId: userId });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.status(200).json(workspace);
  } catch (error) {
    return next(error);
  }
};

export const addFolder = async (req, res, next) => {
  try {
    const { workspaceId, folderName } = req.body;

    if (!workspaceId || !folderName) {
      return next(
        CustomErrorHandler.badRequest(
          "Workspace ID and Folder Name are required"
        )
      );
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return next(CustomErrorHandler.notFound("Workspace not found"));
    }

    const folder = new Folder({
      name: folderName,
      workspaceId: workspace._id,
    });

    await folder.save();

    workspace.folders.push(folder._id);
    await workspace.save();

    res.status(200).json(folder);
  } catch (error) {
    next(error);
  }
};

export const deleteFolder = async (req, res, next) => {
  try {
    const { workspaceId, folderId } = req.body;

    if (!workspaceId || !folderId) {
      return next(
        CustomErrorHandler.badRequest(
          "Workspace ID and Folder ID are required"
        )
      );
    }

    // Find the workspace
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return next(CustomErrorHandler.notFound("Workspace not found"));
    }

    // Find the folder
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return next(CustomErrorHandler.notFound("Folder not found"));
    }

    // Check if the folder belongs to the workspace
    if (!workspace.folders.includes(folderId)) {
      return next(
        CustomErrorHandler.badRequest("Folder does not belong to this workspace")
      );
    }

    // Remove the folder reference from the workspace
    workspace.folders = workspace.folders.filter(
      (id) => id.toString() !== folderId
    );
    await workspace.save();

    // Delete all forms associated with the folder
    await Form.deleteMany({ folderId });

    // Delete the folder itself
    await Folder.findByIdAndDelete(folderId);

    res.status(200).json({ message: "Folder and associated forms deleted successfully" });
  } catch (error) {
    next(error);
  }
};



export const getFolderById = async (req, res,  next) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findById(id);
    
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder);
  } catch (error) {
    next(error)
  }
};



export const addForm = async (req, res, next) => {
  try {
    const { title, folderId } = req.body;
    console.log(req.body);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newForm = new Form({
      title,
      fields: [],
      folderId,
    });

    await newForm.save();

    return res.status(201).json({
      message: "Form created successfully",
      form: newForm,
    });
  } 
  catch (error) {
    next(error);
  }
};


export const deleteForm = async (req, res, next) => {
  try {
    const { folderId, formId } = req.body;

    if (!folderId || !formId) {
      return res.status(400).json({ message: "Folder ID and Form ID are required" });
    }

    const form = await Form.findOne({ _id: formId, folderId });

    if (!form) {
      return res.status(404).json({ message: "Form not found in the specified folder" });
    }

    await Form.findByIdAndDelete(formId);

    return res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const getFormsByFolderId = async (req, res, next) => {
  try {
    const { fid } = req.params;

    if (!fid) {
      return res.status(400).json({ message: "Folder ID is required" });
    }

    const forms = await Form.find({ folderId:fid });

    // if (!forms.length) {
    //   return res.status(404).json({ message: "No forms found for this folder" });
    // }

    return res.status(200).json({ forms });
  } catch (error) {
    next(error);
  }
};

export const getFormById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Form ID is required" });
    }

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json({ form });
  } catch (error) {
    next(error);
  }
};



