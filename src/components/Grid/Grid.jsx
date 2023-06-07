import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default function Grid({ products, addToCart, showFilter }) {
  const [filter, setFilter] = useState('');

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

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4" style={{ gridAutoFlow: 'row' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg max-w-">
            <Link to={`/product/${product.id}`}>
            <img
              className="rounded-t-lg p-8"
              src={product.image}
              alt={product.name}
            />
          </Link>
              <div className="px-5 pb-5 ">
              <Link to={`/product/${product.id}`}>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight mb-2">
                {product.name}
              </h3>
            </Link>
                <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1.5 rounded">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                {product.description}
                  
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-md xs:text-md sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 ">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13" />
                      <path d="M15 6h6m-3 -3v6" />
                    </svg>
                  </button>
                </div>
                
                <Link to={`/product/${product.id}`}
  className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 w-full mt-4 flex items-center">
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-info mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M11 14h1v4h1" />
  <path d="M12 11h.01" />
</svg>
  <span className="ml-2 text-center">Ver Detalle</span>
  </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Grid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
};
