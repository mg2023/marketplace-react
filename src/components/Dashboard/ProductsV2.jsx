import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  "https://market-express-git-main-mg2024.vercel.app/api/v1/products";

const Products = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchProducts();
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
        const sortedProducts = data.sort((a, b) => {
          return new Date(b.modified_at) - new Date(a.modified_at);
        });
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      stars_quantity: "",
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

    if (formValues.id) {
      fetch(`${API_URL}/${formValues.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
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
        body: JSON.stringify(formValues),
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

        <div className="col-span-3 flex justify-center gap-4 sm:col-span-1">
          <div className="w-1/3">
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
              value={formValues.stars_quantity}
              onChange={handleChange}
              className="focus:shadow-outline w-full border-2 border-solid p-2 leading-tight shadow focus:outline-none"
            />
          </div>
          <div className="w-1/3">
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
          <div className="w-1/3">
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

      <div className="overflow-x-auto px-12">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-text">Nombre</th>
              <th className="text-text">Costo/Precio</th>
              <th className="text-text">Precio</th>
              <th className="text-text"></th>
              <th className="text-text"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product.url_img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 font-bold">
                        {product.product_name}
                      </div>
                      <span className="rounded bg-secondary px-2.5 py-1.5 text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {product.cost}
                  <br />
                  <span className="badge badge-outline badge-xl mt-2 ">
                    {product.price}
                  </span>
                </td>
                <td>{product.descrip}</td>
                <th>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-xs hover:bg-secondary"
                  >
                    Preview
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
