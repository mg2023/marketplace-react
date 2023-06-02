
export default function GridDestacados() {


    const products = [
        {
            id: 1,
            name: 'Producto 1',
            price: 10.99,
            image: 'https://picsum.photos/200/300',
        },
        {
            id: 2,
            name: 'Producto 2',
            price: 15.99,
            image: 'https://picsum.photos/202/300',
        },
        {
            id: 3,
            name: 'Producto 3',
            price: 12.99,
            image: 'https://picsum.photos/203/300',
        },
        {
            id: 4,
            name: 'Producto 4',
            price: 12.99,
            image: 'https://picsum.photos/204/300',
        },
        {
            id: 5,
            name: 'Producto 5',
            price: 12.99,
            image: 'https://picsum.photos/205/300',
        },
        {
            id: 6,
            name: 'Producto 6',
            price: 12.99,
            image: 'https://picsum.photos/206/300',
        },
        // Agrega más productos aquí...
    ];



    return (
        <div>
        <h1 className="text-center text-4xl">GridDestacados</h1>
        <div className="grid grid-cols-3 gap-4 p-10">
            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow p-4">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                </div>
            ))}
        </div>
        </div>
    )
}
