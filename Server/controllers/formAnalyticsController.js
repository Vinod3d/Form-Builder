import FormAnalytics from "../models/formAnalytics.js";

// export const updateFormAnalytics = async (req, res, next) => {
//   try {
//     const { formId } = req.params;
//     const { updates } = req.body; // Expect an object like { pageView: 1, formStarted: 1 }

//     if (!formId || !updates) {
//       return res.status(400).json({ message: "Form ID and updates are required." });
//     }

//     // Increment analytics fields dynamically
//     const updatedAnalytics = await FormAnalytics.findOneAndUpdate(
//       { formId },
//       { $inc: updates }, // Updates fields based on the request
//       { new: true, upsert: true } // Create a new record if it doesn't exist
//     );

//     res.status(200).json(updatedAnalytics);
//   } catch (error) {
//     next(error);
//   }
// };


// export const incrementPageView = async (req, res, next) => {
//   try {
//     const { formId } = req.params;

//     const analytics = await FormAnalytics.findOneAndUpdate(
//       { formId },
//       { $inc: { pageView: 1 } },
//       { new: true, upsert: true }
//     );

//     res.status(200).json(analytics);
//   } catch (error) {
//     next(error);
//   }
// };


// export const incrementFormStarted = async (req, res, next) => {
//   try {
//     const { formId } = req.params;

//     const analytics = await FormAnalytics.findOneAndUpdate(
//       { formId },
//       { $inc: { formStarted: 1 } },
//       { new: true, upsert: true }
//     );

//     res.status(200).json(analytics);
//   } catch (error) {
//     next(error);
//   }
// };


export const updateFormAnalytics = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { updates } = req.body;

    // Validate input
    if (!formId || !updates || typeof updates !== "object") {
      return res.status(400).json({ message: "Form ID and valid updates are required." });
    }

    // Ensure all update values are numbers
    for (const key in updates) {
      if (typeof updates[key] !== "number") {
        return res.status(400).json({ message: "All update values must be numbers." });
      }
    }

    // Perform the update
    const updatedAnalytics = await FormAnalytics.findOneAndUpdate(
      { formId },
      { $inc: updates },
      { new: true, upsert: true } // Create a new record if none exists
    );

    if (!updatedAnalytics) {
      return res.status(404).json({ message: "Failed to update analytics. Try again." });
    }

    res.status(200).json(updatedAnalytics);
  } catch (error) {
    next(error);
  }
};