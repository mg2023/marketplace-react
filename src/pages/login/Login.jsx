import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { usuario, login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        throw new Error("Email y contraseña son obligatorias");
      }

      await login(email, password);

      alert("Usuario identificado con éxito 😀");
      // Redirigir según el rol del usuario
      if (usuario.type === 0) {
        navigate("/home");
      } else if (usuario.type === 1) {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message + " 🙁");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-400px flex-row items-center justify-center py-12">
      <h1 className="text-md mb-8 text-center xl:text-4xl">LOGIN</h1>
      <h2 className="text-md text-center xl:text-xl">
        Únete a nuestra comunidad
      </h2>
      <h3 className="xl:text-md mb-8 text-center text-xs">
        Inicia sesión para acceder a tu cuenta o
        <NavLink
          to="/register"
          className="underline hover:font-bold"
        >
          {" "}
          crea una nueva.
        </NavLink>
      </h3>
      <form
        onSubmit={iniciarSesion}
        className="mx-auto w-full max-w-lg"
      >
        <Input
          value={email}
          label="Email"
          onChange={handleEmailChange}
          type="email"
          name="email"
          className="form-control"
          placeholder="Ingrese su correo electrónico"
        />
        <Input
          value={password}
          label="Password"
          onChange={handlePasswordChange}
          type="password"
          name="password"
          className="form-control"
          placeholder="Ingrese su contraseña"
        />
        <div className="flex justify-between">
          <button
            onClick={iniciarSesion}
            className="w-[45%] rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
          <NavLink
            to="/register"
            className="w-[45%] rounded bg-green-500 px-4 py-2 text-center font-bold text-white hover:bg-green-700"
          >
            Ir a Crear Cuenta
          </NavLink>
        </div>
      </form>
      <div className="mt-14 flex justify-center">
        <button className="flex items-center rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700">
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22.64 11.22h-10v2.53h6.44c-.28 1.59-1.85 4.66-6.44 4.66-3.87 0-7.04-3.16-7.04-7.04s3.16-7.04 7.04-7.04c1.97 0 3.74.82 5.01 2.14l3.54-3.54c-2.14-2.14-5.22-3.46-8.55-3.46-6.39 0-11.58 5.19-11.58 11.58s5.19 11.58 11.58 11.58c6.99 0 11.26-4.72 11.26-10.58v-1.22z"
            />
          </svg>
          <span>Iniciar sesión con Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
