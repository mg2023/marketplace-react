import { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
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
    stars_quantity: "",
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

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <form
              onSubmit={handleSubmit}
              className="mb-4 rounded bg-bgfront px-8 pb-8 pt-6 shadow-md"
            >
              <h2 className="mb-4 text-2xl">
                {formValues.id ? "Actualizar Producto" : "Agregar Producto"}
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="product_name"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Nombre del producto:
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={formValues.product_name}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="descrip"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Descripción:
                </label>
                <textarea
                  id="descrip"
                  name="descrip"
                  value={formValues.descrip}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cost"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Costo:
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={formValues.cost}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Precio:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock_quantity"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Cantidad en stock:
                </label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formValues.stock_quantity}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="url_img"
                  className="mb-2 block font-bold text-gray-700"
                >
                  URL de la imagen:
                </label>
                <input
                  type="text"
                  id="url_img"
                  name="url_img"
                  value={formValues.url_img}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stars_quantity"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Cantidad de estrellas:
                </label>
                <input
                  type="number"
                  id="stars_quantity"
                  name="stars_quantity"
                  value={formValues.stars_quantity}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Categoría:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="is_new"
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    id="is_new"
                    name="is_new"
                    checked={formValues.is_new}
                    onChange={(e) =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        is_new: e.target.checked,
                      }))
                    }
                    className="checkbox mr-2 leading-tight"
                  />
                  <span className="text-secondary">¿Es nuevo?</span>
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="is_special_offer"
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    id="is_special_offer"
                    name="is_special_offer"
                    checked={formValues.is_special_offer}
                    onChange={(e) =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        is_special_offer: e.target.checked,
                      }))
                    }
                    className="checkbox checkbox-primary mr-2 leading-tight"
                  />

                  <span className="text-secondary">
                    ¿Es una oferta especial?
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-bgback hover:bg-primaryHover focus:outline-none"
              >
                {formValues.id ? "Actualizar" : "Agregar"}
              </button>
            </form>
          </div>
          <div>
            {products.map((product) => (
              <div
                key={product.id}
                className="mb-2 flex items-center justify-between rounded bg-bgfront px-6 py-4 shadow-md"
              >
                <div className="w-3/4">
                  <h3 className="text-xl font-bold">{product.product_name}</h3>
                  <p className="text-primary">Descripción: {product.descrip}</p>
                  <p className="text-secondary">Precio: {product.price}</p>
                  <p className="text-primary">
                    Cantidad en stock: {product.stock_quantity}
                  </p>
                </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
