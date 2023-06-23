import PropTypes from "prop-types";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivatedRoute = () => {
  const history = useHistory();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    // Verificar si el usuario no está autenticado y redirigir al inicio de sesión
    if (!usuario.token) {
      history.push("/login");
    }
  }, [usuario, history]);

  // Resto del código de la ruta protegida...
};

PrivatedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
};

export default PrivatedRoute;
