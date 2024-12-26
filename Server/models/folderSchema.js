import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  

  export default mongoose.model("Folder", FolderSchema);