import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

export default function Catalogo() {
  const category = localStorage.getItem("selectedCategory");

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const { addToCart } = useContext(Context);
  const categories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    } else {
      setSelectedCategory("Todas");
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      filterGames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery, products, sortOrder]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://market-express-git-main-mg2024.vercel.app/api/v1/products"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterGames = () => {
    let filtered = [...products];

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(
        (game) => game.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((game) =>
        game.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "name") {
      filtered.sort((a, b) => a.product_name.localeCompare(b.product_name));
    }

    setFilteredGames(filtered);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterGames();
  };

  const handleSortChange = (event) => {
    const sortOrder = event.target.value;
    setSortOrder(sortOrder);
  };

  return (
    <section>
      <div className="flex gap-4 p-8">
        <div className="w-4/4 md:w-1/4">
          <h2>Categorías</h2>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full text-bgback"
          >
            <option value="Todas">Todas</option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-2/4">
          <h2>Buscar</h2>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre de juego"
              className="w-full  text-bgback"
            />
            <button
              className="hidden"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="w-4/4 md:w-1/4">
          <h2>Ordenar</h2>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full  text-bgback"
          >
            <option value="price-desc">Precio (mayor a menor)</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="name">Nombre</option>
          </select>
        </div>
      </div>

      <div
        className="mb-8 grid grid-cols-2 gap-4 p-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
        style={{ gridAutoFlow: "row" }}
      >
        {filteredGames.map((product) => (
          <div
            key={product.id}
            className="mx-auto max-w-4xl"
          >
            <div className="max-w- rounded-lg bg-white shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  className="rounded-t-lg"
                  src={product.url_img}
                  alt={product.product_name}
                />
              </Link>
              <div className="px-5 pb-5 ">
                <div>
                  <span className="rounded bg-secondary px-2.5 py-1.5 text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="my-4 w-full px-1 text-xl font-semibold tracking-tight text-bgback">
                    {product.product_name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <span className="text-md xs:text-md font-bold tracking-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl ">
                    ${product.price}
                  </span>
                </div>

                <div className="flex-col md:flex xl:flex">
                  <Link
                    to={`/product/${product.id}`}
                    className="m-1 mt-4 flex items-center rounded-lg bg-bgfront p-2 text-center text-sm font-medium text-white hover:bg-secondary focus:ring-4 focus:ring-secondary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-file-info mr-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
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
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      <path d="M11 14h1v4h1" />
                      <path d="M12 11h.01" />
                    </svg>
                    <span className="ml-1">Ver detalles</span>
                  </Link>

                  <button
                    className="m-1 mt-4 flex items-center rounded-lg bg-bgfront p-2 text-center text-sm font-medium text-white hover:bg-secondary focus:ring-4 focus:ring-secondary"
                    onClick={() => addToCart(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-shopping-cart mr-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
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
                      <circle
                        cx="6"
                        cy="19"
                        r="2"
                      />
                      <circle
                        cx="17"
                        cy="19"
                        r="2"
                      />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                    <span className="ml-1">Agregar al carrito</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
