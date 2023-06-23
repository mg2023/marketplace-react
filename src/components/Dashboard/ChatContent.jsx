import { useState, useEffect } from "react";

const ChatContent = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://market-express-xi.vercel.app/api/v1/contact",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          try {
            const data = await response.json();

            const sortedComments = data.sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            });
            setComments(sortedComments);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error(
            "Error fetching comments:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="mb-12 text-center text-4xl font-bold">Comentarios</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded bg-white p-4 shadow"
          >
            <h3 className="mb-2 text-lg font-semibold">Name: {comment.name}</h3>
            <p className="mb-2">Email: {comment.email}</p>
            <p className="mb-2">Comments: {comment.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContent;
