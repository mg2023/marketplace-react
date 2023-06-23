import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ path, element: Element, ...props }) => {
  const { usuario } = useAuth();

  return usuario.token ? (
    <Route
      {...props}
      element={<Element />}
    />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
