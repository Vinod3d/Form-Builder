import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  sharedWith: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      canEdit: { type: Boolean, default: false },
      canDelete: { type: Boolean, default: false },
    },
  ],
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model("Workspace", WorkspaceSchema);