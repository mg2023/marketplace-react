/* eslint-disable react/prop-types */
export default function Grid({ products }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    );
  }
  