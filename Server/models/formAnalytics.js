import mongoose from "mongoose";

const FormAnalyticsSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
      unique: true, // Ensure one analytics record per form
    },
    pageView: { type: Number, default: 0 },
    formStarted: { type: Number, default: 0 },
    formSubmitted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("FormAnalytics", FormAnalyticsSchema);
