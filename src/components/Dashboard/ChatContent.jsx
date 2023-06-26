import { useState, useEffect } from "react";

const ChatContent = () => {
  const [comments, setComments] = useState([]);
  const API_URL = "https://market-express-xi.vercel.app/api/v1/contact";

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

  const handleDelete = (commentId) => {
    const data = { id: commentId };
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Comentario eliminado exitosamente");
          // Actualizar la lista de comentarios después de eliminar el comentario
          const updatedComments = comments.filter(
            (comment) => comment.id !== commentId
          );
          setComments(updatedComments);
          console.log(setComments, "comentarios");
        } else {
          console.error(
            "Error al eliminar el comentario:",
            response.status,
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="py-12 text-center uppercase">
        <h1 className="text-3xl font-extrabold text-text sm:text-5xl">
          Tickets de Soporte
          <strong className="mt-2 block font-extrabold text-primary">
            consultas y solicitudes de los usuarios
          </strong>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded bg-bgfront p-4 shadow"
          >
            <h3 className="mb-2 text-lg font-semibold">Name: {comment.name}</h3>
            <p className="mb-2">Email: {comment.email}</p>
            <p className="mb-2">Comments: {comment.comments}</p>
            <div className="divider text-text"></div>
            <button
              className="rounded-md bg-secondary px-8 py-1  shadow hover:bg-secondaryHover
              "
              onClick={() => handleDelete(comment.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContent;
