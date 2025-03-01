import Response from '../models/formResponse.js'
import { updateFormAnalytics } from './formAnalyticsController.js';

// Create a new response
export const createResponse = async (req, res, next) => {
  try {
    const { formId, responses } = req.body;
    if (!formId || !responses) {
        return res.status(400).json({ message: "Form ID and responses are required." });
      }
      const formResponse = {
        formId,
        responses: Array.isArray(responses)
          ? responses.map((response) => ({
              question: response?.bubble?.content || "",
              answer: response?.input?.value || "",
            }))
          : [
              {
                question: responses?.bubble?.content || "",
                answer: responses?.input?.value || "",
              },
            ],
      };
    const newResponse = new Response(formResponse);
    await newResponse.save();
    await updateFormAnalytics(formId, { formSubmitted: 1 });
    res.status(201).json(newResponse);
  } catch (error) {
   next(error)
  }
};

// Get all responses
export const getAllResponses = async (req, res, next) => {
  try {
    const responses = await Response.find();
    res.status(200).json(responses);
  } catch (error) {
    next(error)
  }
};

// Get responses by formId
export const getResponsesByFormId = async (req, res, next) => {
  try {
    const { formId } = req.params;
    if (!formId) {
      return res.status(400).json({ message: "Form ID is required." });
    }
    const responses = await Response.find({ formId });
    if (responses.length === 0) {
      return res.status(404).json({ message: "No responses found for this form ID." });
    }
    res.status(200).json(responses);
  } catch (error) {
    next(error);
  }
};


// Get a single response by ID
export const getResponseById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Response.findById(id).populate("formId");
    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
};

// Delete a response by ID
export const deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    await Response.findByIdAndDelete(id);
    res.status(200).json({ message: "Response deleted successfully" });
  } catch (error) {
    next(error)
  }
};
