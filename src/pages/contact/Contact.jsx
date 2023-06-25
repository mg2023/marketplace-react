import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { usuario } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://market-express-xi.vercel.app/api/v1/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ name, email, comments }),
        }
      );

      if (response.ok) {
        // Manejar la respuesta exitosa aquí
        console.log("Formulario enviado exitosamente");
        setFormSubmitted(true); // Establecer el estado de formSubmitted en true
        toast.success("Formulario enviado exitosamente");
        // Restablecer los campos del formulario
        setName("");
        setEmail("");
        setComments("");
      } else {
        // Manejar el error de respuesta aquí
        console.error(
          "Error al enviar el formulario:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Manejar el error de conexión aquí
      console.error("Error de conexión:", error);
    }
  };

  const renderContent = () => {
    if (!usuario.token) {
      return (
        <div className="flex flex-col justify-center">
          <p className="my-4 font-black">
            Por favor, inicia sesión para contactarnos.
          </p>
          <Link
            className="rounded-md bg-gray-800 px-4 py-2 text-center text-white shadow hover:bg-gray-800"
            to="/login"
          >
            Iniciar sesión
          </Link>
        </div>
      );
    }

    if (usuario.data && usuario.data.type === 1) {
      return (
        <div className="flex flex-col justify-center">
          <p className="my-4 font-black">
            Como administrador, no puedes enviar mensajes.
          </p>
        </div>
      );
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg"
      >
        <Input
          label="Nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
          className="mb-4"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          className="mb-4"
        />
        <div className="w-full">
          <label
            htmlFor="comments"
            className="mb-2 block font-medium text-gray-700"
          >
            Mensaje
          </label>
          <textarea
            id="comments"
            className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            rows="5"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Escribe tu mensaje..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-400px mb-24 mt-12 flex flex-col items-center pt-4">
      <h1 className="mb-8 text-center text-xl font-black xl:text-4xl">
        CONTACTO
      </h1>
      <h2 className="text-md text-center xl:text-xl">
        ¡Nos encantaría saber de ti!
      </h2>
      {renderContent()}
    </div>
  );
};

export default Contact;
