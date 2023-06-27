import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  "https://market-express-git-main-mg2024.vercel.app/api/v1/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formValues, setFormValues] = useState({
    product_name: "",
    descrip: "",
    cost: "",
    price: "",
    stock_quantity: "",
    url_img: "",
    stars_quantity: "2",
    category: "",
    is_new: false,
    is_special_offer: false,
  });
  const [sortOrder, setSortOrder] = useState({
    field: "",
    ascending: true,
  });

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud GET");
        }
      })
      .then((data) => {
        const sortedProducts = sortProducts(data, sortOrder);
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts); // Actualiza la lista filtrada
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      if (product.product_name) {
        return product.product_name
          .toLowerCase()
          .includes(filter.toLowerCase());
      }
      return false;
    });
    setFilteredProducts(filtered);
  }, [products, filter]);

  const sortProducts = (data, sortOrder) => {
    const { field, ascending } = sortOrder;
    let sortedData = [...data];

    switch (field) {
      case "price":
        sortedData.sort((a, b) => {
          if (ascending) {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
        break;
      case "cost":
        sortedData.sort((a, b) => {
          if (ascending) {
            return a.price - a.cost - (b.price - b.cost);
          } else {
            return b.price - b.cost - (a.price - a.cost);
          }
        });
        break;
      case "stock_quantity":
        sortedData.sort((a, b) => {
          if (ascending) {
            return a.stock_quantity - b.stock_quantity;
          } else {
            return b.stock_quantity - a.stock_quantity;
          }
        });
        break;
      case "product_name":
        sortedData.sort((a, b) => {
          if (ascending) {
            return a.product_name.localeCompare(b.product_name);
          } else {
            return b.product_name.localeCompare(a.product_name);
          }
        });
        break;
      default:
        break;
    }

    return sortedData;
  };

  const handleSort = (field) => {
    const ascending = sortOrder.field === field ? !sortOrder.ascending : true;
    const newSortOrder = { field, ascending };
    const sortedProducts = sortProducts(products, newSortOrder);

    setSortOrder(newSortOrder);
    setProducts(sortedProducts);
  };

  const handleAddOrUpdate = (product) => {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      setProducts((prevProducts) => [
        ...prevProducts.slice(0, index),
        product,
        ...prevProducts.slice(index + 1),
      ]);
    } else {
      setProducts((prevProducts) => [...prevProducts, product]);
    }
    setFormValues({
      product_name: "",
      descrip: "",
      cost: "",
      price: "",
      stock_quantity: "",
      url_img: "",
      stars_quantity: "1",
      category: "",
      is_new: false,
      is_special_offer: false,
    });
    fetchProducts();
    toast.success("Producto Actualizado");
  };

  const handleEdit = (product) => {
    setFormValues(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (productId) => {
    const data = { id: productId };

    fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // La solicitud se ha completado correctamente
          // Realiza las acciones necesarias después de eliminar el producto
          setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== productId)
          );
          toast.error("Producto Eliminado");
        } else {
          // Ha ocurrido un error al procesar la solicitud DELETE
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormValues = { ...formValues };
    if (updatedFormValues.stars_quantity === "") {
      updatedFormValues.stars_quantity = "1";
    }

    if (updatedFormValues.id) {
      fetch(`${API_URL}/${updatedFormValues.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormValues),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud PUT");
          }
        })
        .then((data) => {
          handleAddOrUpdate(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormValues),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud POST");
          }
        })
        .then((data) => {
          handleAddOrUpdate(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCancel = () => {
    setFormValues({
      product_name: "",
      descrip: "",
      cost: "",
      price: "",
      stock_quantity: "",
      url_img: "",
      stars_quantity: "",
      category: "",
      is_new: false,
      is_special_offer: false,
    });
  };

  const calculateProfitPercentage = (cost, price) => {
    const profit = price - cost;
    const profitPercentage = (profit / cost) * 100;
    return profitPercentage.toFixed(2);
  };

  return (
    <div>
      <form
        className="mb-4 grid grid-cols-3 gap-4 p-10"
        onSubmit={handleSubmit}
      >
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="product_name"
            value={formValues.product_name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            name="category"
            value={formValues.category}
            onChange={handleChange}
            className="select w-full bg-text text-bgback"
            required
          >
            <option
              disabled
              value=""
            >
              Categoría
            </option>
            <option value="Shooter">Shooter</option>
            <option value="Carreras">Carreras</option>
            <option value="Deporte">Deporte</option>
            <option value="RPG">RPG</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="text"
            name="stock_quantity"
            value={formValues.stock_quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="col-span-3 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="descrip"
            value={formValues.descrip}
            onChange={handleChange}
            className="input input-bordered w-full bg-text"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            URL de imagen
          </label>
          <input
            type="text"
            name="url_img"
            value={formValues.url_img}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="text"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Costo
          </label>
          <input
            type="text"
            name="cost"
            value={formValues.cost}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="col-span-2 flex justify-center gap-4 sm:col-span-1">
          <div className="hidden w-1/3">
            <label
              htmlFor="stars_quantity"
              className="mb-2 block text-sm font-medium"
            >
              Stars
            </label>
            <input
              type="number"
              id="stars_quantity"
              name="stars_quantity"
              value="1"
              className="focus:shadow-outline w-full border-2 border-solid p-2 leading-tight shadow focus:outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium ">Nuevo</label>

            <input
              type="checkbox"
              id="is_new"
              name="is_new"
              checked={formValues.is_new}
              className="checkbox mr-2 mt-2 w-full border-2 border-solid p-4 leading-tight checked:border-secondary"
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  is_new: e.target.checked,
                }))
              }
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Off %
            </label>
            <input
              type="checkbox"
              id="is_special_offer"
              name="is_special_offer"
              checked={formValues.is_special_offer}
              className="checkbox mr-2 mt-2 w-full border-2 border-solid p-4 leading-tight checked:border-secondary"
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  is_special_offer: e.target.checked,
                }))
              }
            />
          </div>
        </div>

        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-bgback hover:bg-primaryHover focus:outline-none"
          >
            {formValues.id ? "Actualizar" : "Agregar"}
          </button>
          <button
            type="button"
            onClick={() => handleCancel()}
            className="rounded-md bg-secondary px-4 py-2 text-white hover:bg-secondaryHover"
          >
            Cancelar
          </button>
        </div>
      </form>
      <div className="">
        {" "}
        <hr className="text-bgFront my-12 w-full px-24" />
      </div>
      <div className="flex justify-center">
        <p className="mb-12 block md:hidden">
          Desliza hacia los lados <br /> para ver la tabla completa
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrows-diff md:hidden"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#7bc62d"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M11 16h10" />
          <path d="M11 16l4 4" />
          <path d="M11 16l4 -4" />
          <path d="M13 8h-10" />
          <path d="M13 8l-4 4" />
          <path d="M13 8l-4 -4" />
        </svg>
      </div>
      <div className="overflow-x-auto px-12">
        <div>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por nombre"
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th
                className="text-text"
                onClick={() => handleSort("product_name")}
              >
                <div className="flex cursor-pointer items-center">
                  Nombre
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrows-move-vertical"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#7bc62d"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    />
                    <path d="M9 18l3 3l3 -3" />
                    <path d="M12 15v6" />
                    <path d="M15 6l-3 -3l-3 3" />
                    <path d="M12 3v6" />
                  </svg>
                </div>
              </th>
              <th
                className="text-text"
                onClick={() => handleSort("price")}
              >
                <div className="flex cursor-pointer items-center">
                  Costo/Precio{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrows-move-vertical"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#7bc62d"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    />
                    <path d="M9 18l3 3l3 -3" />
                    <path d="M12 15v6" />
                    <path d="M15 6l-3 -3l-3 3" />
                    <path d="M12 3v6" />
                  </svg>
                </div>
              </th>
              <th
                className="text-text"
                onClick={() => handleSort("cost")}
              >
                <div className="flex cursor-pointer items-center">
                  Margen/G{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrows-move-vertical"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#7bc62d"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    />
                    <path d="M9 18l3 3l3 -3" />
                    <path d="M12 15v6" />
                    <path d="M15 6l-3 -3l-3 3" />
                    <path d="M12 3v6" />
                  </svg>
                </div>
              </th>
              <th
                className="text-text"
                onClick={() => handleSort("stock_quantity")}
              >
                <div className="flex cursor-pointer items-center">
                  {" "}
                  Stock{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-arrows-move-vertical"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#7bc62d"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    />
                    <path d="M9 18l3 3l3 -3" />
                    <path d="M12 15v6" />
                    <path d="M15 6l-3 -3l-3 3" />
                    <path d="M12 3v6" />
                  </svg>
                </div>
              </th>

              <th className="text-text"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product.url_img}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 font-bold">
                        {product.product_name}
                      </div>
                      <span className="rounded bg-secondary px-2.5 py-1.5 text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-outline badge-xl mt-2  bg-secondary text-xs ">
                    {product.cost}
                  </span>
                  <br />
                  <span className="badge badge-outline badge-xl mt-2 bg-primary py-2 text-xl font-semibold  text-bgback">
                    {product.price}
                  </span>
                </td>

                <td>
                  <span className="text-xl font-semibold text-primary">
                    {calculateProfitPercentage(product.cost, product.price)}%
                  </span>
                </td>
                <td>
                  <span className="text-xl font-semibold ">
                    {product.stock_quantity}
                  </span>
                </td>

                <th>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-xs hover:bg-secondary"
                  >
                    Detalle
                  </Link>
                </th>
                <th>
                  <div className="w-1/4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="focus:shadow-outline m-2 rounded bg-primary p-2 font-bold text-bgback  hover:bg-primaryHover focus:outline-none"
                    >
                      <RiEdit2Line />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="focus:shadow-outline m-2 rounded bg-red-500 p-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
