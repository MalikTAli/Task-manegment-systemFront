import axios from "axios";

export async function getAllProjects({ status = "all", search = "", token }) {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query GetProjects($status: String, $search: String) {
          projects(status: $status, search: $search) {
            id
            name
            status
            startDate
            endDate
            category
            description
            completionPercentage
            createdBy {
              id
              email
            }
            members {
              id
              email
            }
          }
        }
      `,
      variables: {
        status,
        search,
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.projects;
}





export async function createProject(projectInput, token) {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        mutation CreateProject($projectInput: ProjectInput!) {
          createProject(projectInput: $projectInput) {
            id
            name
            description
            status
            category
            startDate
            endDate
            members {
              id
              email
            }
          }
        }
      `,
      variables: { projectInput },
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.createProject;
}



export const getProjectDetails = async (projectId, token) => {
  const query = `
    query GetProjectWithTasks($id: ID!) {
      getProjectWithTasks(id: $id) {
        id
        name
        description
        startDate
        endDate
        category
        members {
          email
        }
        tasks {
          id
          name
          status
          description
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
    }
  `;

  const variables = { id: projectId };

  const response = await axios.post(
    "http://localhost:4000/graphql",
    { query, variables },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.getProjectWithTasks;
};
