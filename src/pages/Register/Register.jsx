import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleRegister = async () => {
    try {
      const usuario = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        telephone,
      };

      const response = await axios.post(
        "https://market-express-git-main-mg2024.vercel.app/api/v1/users/register",
        usuario
      );

      console.log(response.data);
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Algo salió mal...");
    }
  };

  return (
    <div className="min-h-400px mb-8 flex-row items-center justify-center py-12">
      <h1 className="text-md mb-8 text-center xl:text-4xl">Registrar Cuenta</h1>
      <h2 className="text-md text-center xl:text-xl">
        Únete a nuestra comunidad
      </h2>
      <h3 className="xl:text-md mb-8 text-center text-xs">
        Crea una nueva cuenta o Inicia sesión para
        <NavLink
          to="/login"
          className="underline hover:font-bold"
        >
          {" "}
          acceder a tu cuenta.
        </NavLink>
      </h3>
      <form className="mx-auto w-full max-w-lg">
        <Input
          label="Teléfono"
          type="tel"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="1234567890"
          className="mb-2"
        />
        <Input
          label="Nombre"
          type="text"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nombre"
          className="mb-2"
        />
        <Input
          label="Apellido"
          type="text"
          name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
          className="mb-2"
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          className="mb-2"
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="mb-2"
        />

        <button
          type="button"
          onClick={handleRegister}
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Registrar
        </button>

        <p className="mt-4">
          ¿Ya tienes una cuenta?{" "}
          <NavLink
            to="/login"
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            Inicia sesión
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
