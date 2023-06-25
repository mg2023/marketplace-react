import { Link } from "react-router-dom";

export default function CategoryGrid() {
  const handleClick = (category) => {
    localStorage.setItem("selectedCategory", category);
  };
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="py-12 text-center uppercase">
          <h1 className="text-2xl font-extrabold text-text sm:text-5xl">
            Categorías Destacadas
            <strong className="mt-2 block font-extrabold text-primary">
              Disfruta de la mejor colección de juegos de PS4
            </strong>
          </h1>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li className="group relative">
            <Link
              to="/catalogo"
              className="block"
              onClick={() => handleClick("deporte")}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/recursos%2Ffifa.jpg?alt=media&token=00d795a7-190c-4969-b320-91c637bce12e"
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="mb-4 text-xl font-medium text-white">Deporte</h3>
                <span className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover">
                  Ver Todos
                </span>
              </div>
            </Link>
          </li>

          <li className="group relative">
            <Link
              to="/catalogo"
              className="block"
              onClick={() => handleClick("rpg")}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/recursos%2Frpg_cat.jpg?alt=media&token=297575f7-dc31-441e-b0c2-7dd77cbe3f54"
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="mb-4 text-xl font-medium text-white">RPG</h3>
                <span className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover">
                  Ver Todos
                </span>
              </div>
            </Link>
          </li>

          <li className="group relative lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Link
              to="/catalogo"
              className="block"
              onClick={() => handleClick("shooter")}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/proyecto-final-desafio-latam.appspot.com/o/recursos%2Fshooter.jpg?alt=media&token=29266ca2-bf34-4410-93ab-5a54e4dc4ef5"
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="mb-4 text-xl font-medium text-white">Shooter</h3>
                <span className="rounded-md bg-primary px-4 py-2 text-primaryText shadow hover:bg-primaryHover">
                  Ver Todos
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
