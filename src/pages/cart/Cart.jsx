export default function Cart({ cartItems, removeFromCart }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compra</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">${item.price}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-bold"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 font-bold">Total: ${getTotalPrice()}</div>
    </div>
  );
}
