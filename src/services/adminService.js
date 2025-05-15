import axios from "axios";

export async function getAllAdmins(token) {
  const response = await axios.post(
    "http://localhost:4000/graphql",
    {
      query: `
        query {
          allAdmins {
            id
            email
            role
          }
        }
      `,
    },
    {
      headers: {
        
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data.allAdmins;
}
