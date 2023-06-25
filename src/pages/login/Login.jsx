import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Input from "../../components/Input/Input";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, usuario } = useContext(AuthContext);

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

      toast.success("Usuario identificado con éxito 😀");
    } catch (error) {
      toast.error(error.message + " 🙁");
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (usuario.token) {
    if (usuario.data && usuario.data.type !== 1) {
      // Si el usuario no es administrador, mostrar un mensaje de acceso restringido
      return (
        <div className="flex min-h-screen flex-col items-center pt-[15%]">
          <h1 className="text-md mb-8 text-center xl:text-4xl">
            Acceso Restringido
          </h1>
          <p className="my-4 font-black">
            No tienes acceso a esta página. Por favor, haz logout e inicia
            sesión con una cuenta de administrador.
          </p>

          <button
            onClick={logout}
            className="rounded-md bg-red-800 px-4 py-2 text-white shadow hover:bg-gray-800"
          >
            Logout
          </button>
          <h2 className="text-md mt-4 text-center xl:text-xl">
            DEMO ADMIN: admin@admin.com / admin
          </h2>
        </div>
      );
    }

    // Si el usuario es administrador, mostrar mensaje de inicio de sesión exitoso
    return (
      <div className="flex min-h-screen flex-col items-center pt-[15%]">
        <h1 className="text-md mb-8 text-center xl:text-4xl">LOGIN</h1>
        <h2 className="text-md text-center xl:text-xl">
          ¡Has iniciado sesión correctamente!
        </h2>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <h2 className="text-md mt-4 text-center xl:text-xl">
          DEMO ADMIN: admin@admin.com / admin
        </h2>
      </div>
    );
  }

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
      <h2 className="text-md mt-4 text-center xl:text-xl">
        DEMO ADMIN: admin@admin.com / admin
      </h2>
    </div>
  );
};

export default Login;
