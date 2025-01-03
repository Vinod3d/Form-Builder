import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  formId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Form", 
    required: true, 
  },
  responses: [
    {
      bubble: {
        id: { type: String, required: true },
        type: { type: String, enum: ["text", "image", "video", "gif"], required: true },
        content: { type: String, required: true },
      },
      input: {
        type: { type: String, enum: ["text", "email", "number", "date", "tel", "textarea"], required: true },
        value: { type: String, required: true }, 
      },
    },
  ],
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Response", ResponseSchema);
