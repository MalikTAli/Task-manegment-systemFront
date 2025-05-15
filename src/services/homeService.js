import axios from "axios";

export const getHomeInfo = async (token) => {
  const query = {
    query: `
      query {
        getSummaryCounts {
          title
          count
        }
      }
    `,
  };

  const response = await axios.post("http://localhost:4000/graphql", query, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.getSummaryCounts;
};
