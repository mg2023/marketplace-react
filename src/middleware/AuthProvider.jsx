import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TOKEN_STORAGE_KEY = "token";
const EXPIRATION_STORAGE_KEY = "expiration";
const USER_DATA_STORAGE_KEY = "userData";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedExpiration = localStorage.getItem(EXPIRATION_STORAGE_KEY);
    const storedUserData = localStorage.getItem(USER_DATA_STORAGE_KEY);

    return {
      token: storedToken,
      data: storedUserData ? JSON.parse(storedUserData) : null,
      expiration: storedExpiration ? new Date(storedExpiration) : null,
    };
  });

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const { expiration, data } = usuario;

      if (expiration && new Date() > expiration) {
        // Token ha expirado, realizar acciones necesarias (por ejemplo, cerrar sesión)
        logout();
      } else if (!data) {
        // Obtener la información del usuario si no está presente en el estado
        try {
          const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
          const userInfoUrl = `https://market-express-xi.vercel.app/api/v1/users/getId/${storedToken}`;
          const userInfoResponse = await fetch(userInfoUrl);

          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();

            // Guardar la información del usuario en el localStorage
            localStorage.setItem(
              USER_DATA_STORAGE_KEY,
              JSON.stringify(userInfo)
            );

            // Actualizar el estado del usuario con la información obtenida
            setUsuario((prevUsuario) => ({
              ...prevUsuario,
              data: userInfo,
            }));
          } else {
            throw new Error("Error al obtener la información del usuario");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkTokenExpiration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

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

        // Calcular la marca de tiempo de expiración (20 minutos después de la fecha actual)
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 20);

        // Guardar el token y la marca de tiempo de expiración en el localStorage
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        localStorage.setItem(EXPIRATION_STORAGE_KEY, expirationDate.toString());

        // Actualizar el estado del usuario con el token y la marca de tiempo de expiración
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          token,
          expiration: expirationDate,
        }));

        // Obtener la información del usuario
        const userInfoUrl = `https://market-express-xi.vercel.app/api/v1/users/getId/${email}`;
        const userInfoResponse = await fetch(userInfoUrl);
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();

          // Guardar la información del usuario en el localStorage
          localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(userInfo));

          // Actualizar el estado del usuario con la información obtenida
          setUsuario((prevUsuario) => ({
            ...prevUsuario,
            data: userInfo,
          }));

          if (userInfo.type === 0) {
            navigate("/");
          } else if (userInfo.type === 1) {
            navigate("/dashboard");
          }
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
    localStorage.removeItem(EXPIRATION_STORAGE_KEY);
    localStorage.removeItem(USER_DATA_STORAGE_KEY);
    setUsuario({ token: null, data: null, expiration: null });
    navigate("/login");
    toast.error("Sesión Finalizada");
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
