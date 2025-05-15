// services/chatService.js
export const getMessagesBetween = async (senderId, recipientId, token) => {
  const query = {
    query: `
      query GetMessages($senderId: ID!, $recipientId: ID!) {
        getMessagesBetween(senderId: $senderId, recipientId: $recipientId) {
          id
          content
          createdAt
          sender { id }
          recipient { id }
        }
      }
    `,
    variables: {
      senderId,
      recipientId,
    },
  };

  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
  });

  const result = await res.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.getMessagesBetween;
};
