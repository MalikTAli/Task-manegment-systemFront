const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql'; // عدّل هذا إذا كان مختلفاً

export async function registerUser({ email, password, universityId, isStudent }) {
  const query = isStudent
    ? `mutation RegisterStudent($email: String!, $password: String!, $universityId: String!) {
        registerStudent(email: $email, password: $password, universityId: $universityId) {
          message
          status
        }
      }`
    : `mutation RegisterAdmin($email: String!, $password: String!) {
        registerAdmin(email: $email, password: $password) {
          message
          status
        }
      }`;

  const variables = isStudent
    ? { email, password, universityId }
    : { email, password };

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    const data = isStudent ? result.data.registerStudent : result.data.registerAdmin;

    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    return { message: 'An unexpected error occurred', status: 'error' };
  }
}
