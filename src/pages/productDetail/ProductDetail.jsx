import { useParams, NavLink } from 'react-router-dom';

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert('Producto agregado al carrito');
  };

  return (
    <div>
      <h2>Detalles del producto {product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p className="mb-4">Precio: ${product.price}</p>

      <button
        onClick={handleAddToCart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar al carrito
      </button>

      <NavLink
        to="/cart"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Ir al carrito
      </NavLink>
    </div>
  );
}
