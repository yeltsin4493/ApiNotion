// module.exports = {
//   handleApiError,
// };
// const fetch = require('node-fetch');
// import { handleApiError } from "/notionErrorHandler";
// const { handleApiError } = require("./notionErrorHandler");
import fetch from "node-fetch";
import { Client } from "@notionhq/client";

async function fetchDataFromExternalAPI() {
  try {
    fetch("https://mocki.io/v1/80bfeeba-5fc6-47d7-ad5d-7b4e027349a")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
        handleApiError(
          "External API Request Error",
          error,
          "secret_btTaRYrSL9mgqxRcP34hMmsx7qYmsdyjx0pFzdu4Ibf"
        )
      );
    // console.log("hola")
  } catch (error) {
    console.log("entro");
    console.error(error);
    await handleApiError(
      "External API Request Error",
      error,
      "secret_btTaRYrSL9mgqxRcP34hMmsx7qYmsdyjx0pFzdu4Ibf"
    );
  }
}

async function handleApiError(errorType, errorData, apiKey) {
  console.log("entro a handle");
  const taskDescription = `API Error: ${errorType}. Data: ${errorData}`;
  try {
    const response = await addTask(apiKey, taskDescription);
    return response;
  } catch (error) {
    console.error("Unable to log error to Notion", error);
  }
}

async function addTask(apiKey, task) {
  console.log("entro a task");
  console.log("entro a task api", apiKey);
  console.log("entro a task task", task);
  const notion = new Client({ auth: apiKey });
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: null, // Elimina la referencia al databaseId
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: task,
              },
            },
          ],
        },
      },
    });
    console.log("envio tarea");
    return response;
  } catch (error) {
    throw new Error("Unable to add task to Notion");
  }
}

fetchDataFromExternalAPI();
