import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "email", "number", "textarea", "radio", "checkbox", "select", "date"],
    required: true,
  },
  placeholder: { type: String },
  options: [String],
  required: { type: Boolean, default: false },
});

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: [FieldSchema],
  sharedLink: { type: String }, // Auto-generated unique link for the form
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default  mongoose.model("Form", FormSchema);












// const FormSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String },
//     fields: [
//       {
//         label: { type: String, required: true },
//         type: { type: String, enum: ["text", "email", "number", "textarea", "radio", "checkbox", "select", "date"], required: true },
//         placeholder: { type: String },
//         options: [String], // For fields like radio, checkbox, or select
//         required: { type: Boolean, default: false }
//       }
//     ],
//     background: { type: String }, // URL or predefined options
//     isPublic: { type: Boolean, default: false }, // If true, anyone can fill the form using its link
//     sharedLink: { type: String }, // Auto-generated unique link for the form
//     folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
//   });
  