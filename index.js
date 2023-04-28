import fetch from "node-fetch";
import { Client } from "@notionhq/client";

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

  const notion = new Client({ auth: apiKey });
  console.log("notion", notion)
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: 'Bifrost-Support-fec10a664474437b87c3bf648d8bbd3e',
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "test",
              },
            },
          ],
        },
      },
    });
    console.log("ENVIO TAREA");
    return response;
  } catch (error) {
    throw new Error(`Unable to add task to Notion: ${error.message}`);
  }
}

async function fetchDataFromExternalAPI() {
  const apiKey = "secret_btTaRYrSL9mgqxRcP34hMmsx7qYmsdyjx0pFzdu4Ibf";
  try {
    fetch("https://mocki.io/v1/80bfeeba-5fc6-47d7-ad5d-7b4e027349a")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
        handleApiError("External API Request Error", error, apiKey)
      );
  } catch (error) {
    console.log("entro");
    await handleApiError("External API Request Error", error, apiKey);
  }
}

fetchDataFromExternalAPI();
