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
            <ul className="items-center justify-center space-y-8 text-center text-text  md:flex md:space-x-6 md:space-y-0">
              <li className="hover:text-primary">
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li className="hover:text-primary">
                <NavLink to="/catalogo">Catalogo</NavLink>
              </li>
              <li className="hover:text-primary">
                <NavLink to="/support">Support</NavLink>
              </li>
              {/* <li className="">
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
              </li>*/}
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
              {/*  <li className="">
                <NavLink
                  to="/dashboard"
                  className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover"
                >
                  dashboard
                </NavLink>
              </li>*/}

              <li>
                <div className="flex flex-1 justify-end px-2">
                  <div className="flex items-stretch">
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost rounded-btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-home-cog"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#c9de00"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h1.6" />
                          <path d="M20 11l-8 -8l-9 9h2v7a2 2 0 0 0 2 2h4.159" />
                          <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M18 14.5v1.5" />
                          <path d="M18 20v1.5" />
                          <path d="M21.032 16.25l-1.299 .75" />
                          <path d="M16.27 19l-1.3 .75" />
                          <path d="M14.97 16.25l1.3 .75" />
                          <path d="M19.733 19l1.3 .75" />
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content rounded-box z-[1] mt-4 w-52 bg-bgback p-2 shadow"
                      >
                        <li>
                          <NavLink
                            className="active:bg-primary"
                            to="/dashboard"
                          >
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>{" "}
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          {usuario.token ? (
                            <button onClick={logout}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-logout"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#ffffff"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M9 12h12l-3 -3" />
                                <path d="M18 15l3 -3" />
                              </svg>{" "}
                              Logout
                            </button>
                          ) : (
                            <NavLink to="/login">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-login"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#ffffff"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                              </svg>{" "}
                              Login
                            </NavLink>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
