import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ cartItemCount }) {
  const [navbar, setNavbar] = useState(false);
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav
      data-theme="synthwave"
      className="z-900  top-0 w-full bg-bgfront shadow"
    >
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <NavLink to="/">
              <img
                className="max-w-[35%]"
                src="https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/logo%2Fgame_over2.png?alt=media&token=208cfd28-9fb5-4ed3-928f-efa8a0808a4a"
                alt="Logo Game Over"
              />
            </NavLink>
            <div className="md:hidden">
              <button
                className="rounded-md p-2 text-primary outline-none focus:border focus:border-primary"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`mt-8 flex-1 justify-self-center pb-12 md:mt-0 md:block md:pb-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 text-center text-text md:flex md:space-x-6 md:space-y-0">
              <li className="">
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li className="">
                <NavLink to="/catalogo">Catalogo</NavLink>
              </li>
              <li className="">
                <NavLink to="/contact">Contacto</NavLink>
              </li>
              <li className="">
                {usuario.token ? (
                  <button
                    onClick={logout}
                    className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover"
                  >
                    Login
                  </NavLink>
                )}
              </li>
              <li className="relative ">
                <NavLink
                  to="/cart"
                  className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover"
                >
                  Carrito
                  {cartItemCount > 0 && (
                    <span className="absolute right-32 top-0 -mr-1 -mt-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-primary md:right-0 md:top-0 xl:right-0 xl:top-0">
                      {cartItemCount}
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard"
                  className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover"
                >
                  dashboard
                </NavLink>
              </li>
              <li>
                {usuario.token && usuario.data ? (
                  <p className="font-thin text-text">
                    Hola,
                    <span className="font-bold text-primary">
                      {" "}
                      {usuario.data.first_name}
                    </span>
                  </p>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  cartItemCount: PropTypes.number.isRequired,
};
