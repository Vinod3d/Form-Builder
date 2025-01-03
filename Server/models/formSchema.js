import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  elements: [
    {
      id: { type: String, required: true },
      bubble: {
        id: { type: String, required: true },
        type: { type: String, enum: ["text", "image", "video", "gif"], required: true },
        content: { type: String, required: true },
        url: { type: String },
        userInput: { type: String },
      },
      input: {
        id: { type: String },
        type: { type: String, enum: ["text", "email", "number", "date", "tel", "textarea"] },
        placeholder: { type: String },
        options: [String],
        required: { type: Boolean, default: false },
      },
    },
  ],
  sharedLink: { type: String, unique: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



export default mongoose.model("Form", FormSchema);
