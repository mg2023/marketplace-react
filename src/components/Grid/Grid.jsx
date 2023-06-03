import { useNavigate } from 'react-router-dom';

export default function Grid({ products }) {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-10">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow p-4">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => handleProductClick(product.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Ver detalle
          </button>
        </div>
      ))}
    </div>
  );
}
