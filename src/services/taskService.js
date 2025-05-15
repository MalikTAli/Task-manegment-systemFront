import axios from "axios";

export const getAllTasks = async (token) => {
  const query = {
    query: `
      query {
        tasks {
          id
          name
          description
          status
          dueDate
          assignedTo {
            id
            email
          }
        }
      }
    `,
  };

  const response = await axios.post("http://localhost:4000/graphql", query, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.data.tasks;
};


// services/taskService.js
export async function addTask(taskInput, token) {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation AddTask($taskInput: TaskInput!) {
          addTask(taskInput: $taskInput) {
            id
            name
            description
            status
            dueDate
            assignedTo {
              id
              email
            }
            assignedToProject {
              id
              name
            }
          }
        }
      `,
      variables: { taskInput },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.addTask;
}
