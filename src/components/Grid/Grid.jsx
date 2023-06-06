import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Grid({ products, addToCart, showFilter }) {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {showFilter && (
        <div className="flex justify-center">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Filtrar por nombre"
            className="p-2 border border-gray-300 rounded w-[80%]"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>

            <div className="flex justify-between">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4 w-[45%]"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => handleProductClick(product.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4 w-[45%]"
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
