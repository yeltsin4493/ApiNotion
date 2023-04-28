// const { Client } = require("@notionhq/client");
import { Client } from "@notionhq/client";

async function addTask(apiKey, task) {
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
    return response;
  } catch (error) {
    throw new Error("Unable to add task to Notion");
  }
}

module.exports = {
  addTask,
};
