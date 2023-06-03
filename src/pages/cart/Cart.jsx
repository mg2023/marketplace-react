import { useParams, NavLink } from 'react-router-dom';

export default function Cart({ cartItems, removeFromCart }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compra</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 font-bold">Producto</div>
        <div className="font-bold">Precio</div>
        <div className="font-bold">Cantidad</div>
        <div></div>
      </div>
      {cartItems.map((item) => (
        <div key={item.id} className="grid grid-cols-4 gap-4 mt-2">
          <div className="col-span-2">{item.name}</div>
          <div>${item.price}</div>
          <div>{item.quantity}</div>
          <div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold">
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ${getTotalPrice()}</div>
    </div>
  );
}
