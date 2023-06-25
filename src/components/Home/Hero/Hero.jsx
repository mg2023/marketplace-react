import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section className="relative bg-[url(https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/banner_principal%2FbgHero.jpg?alt=media&token=5fa7dc3b-89c9-42b1-a2bd-914cac3f9507)] bg-cover bg-center bg-no-repeat">
        <div className="bg-gray/75 absolute inset-0 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" />

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl  text-left ">
            <h1 className="text-3xl font-extrabold text-text sm:text-5xl">
              GAME OVER
              <strong className="mt-2 block font-extrabold text-primary">
                Tienda de PS4
              </strong>
            </h1>

            <p className="mt-4 max-w-xl sm:text-xl/relaxed">
              La mejor colección de juegos de PS4, con entrega inmediata y
              delivery gratis,{" "}
              <span className="font-semibold text-primary">
                Crea una cuenta para poder comprar tus juegos favoritos y
                comunicarte con nosotros.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <NavLink
                to="/register"
                className="rounded-md bg-secondary px-12 py-3  shadow hover:bg-secondaryHover"
              >
                Crear Cuenta
              </NavLink>

              <NavLink
                to="/login"
                className="rounded-md bg-text px-12 py-3 text-bgback shadow  hover:bg-gray-600 hover:text-white"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
