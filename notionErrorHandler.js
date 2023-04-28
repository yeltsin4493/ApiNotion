// const { addTask } = require("./notion");
import { addTask } from "/notion";

async function handleApiError(errorType, errorData, apiKey) {
  const taskDescription = `API Error: ${errorType}. Data: ${errorData}`;
  try {
    const response = await addTask(apiKey, taskDescription);
    return response;
  } catch (error) {
    console.error("Unable to log error to Notion", error);
  }
}

module.exports = {
  handleApiError,
};
