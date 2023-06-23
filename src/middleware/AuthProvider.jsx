import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const TOKEN_STORAGE_KEY = "token";

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    return {
      token: storedToken,
      data: null,
    };
  });

  const login = async (email, password) => {
    try {
      // Realizar la solicitud a la API para iniciar sesión
      const response = await fetch(
        "https://market-express-xi.vercel.app/api/v1/users/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Guardar el token en el localStorage
        localStorage.setItem(TOKEN_STORAGE_KEY, token);

        // Actualizar el estado del usuario con el token
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          token,
        }));

        // Obtener la información del usuario
        const userInfoUrl = `https://market-express-xi.vercel.app/api/v1/users/getId/${email}`;
        const userInfoResponse = await fetch(userInfoUrl);
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();

          // Actualizar el estado del usuario con la información obtenida
          setUsuario((prevUsuario) => ({
            ...prevUsuario,
            data: userInfo,
          }));

          console.log("Usuario:", {
            token,
            data: userInfo,
          });
        } else {
          throw new Error("Error al obtener la información del usuario");
        }
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Limpiar la información del usuario al cerrar sesión
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUsuario({ token: null, data: null });
  };

  const authContextValues = {
    usuario,
    setUsuario,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
