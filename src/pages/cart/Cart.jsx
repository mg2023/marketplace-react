import { useContext } from "react";
import Context from "../../context/Context";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(Context);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price, 0)
      .toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  const totalPrice =
    parseFloat(getTotalPrice().replace(/[^0-9.-]+/g, "")) + 4900;

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                src={item.url_img}
                alt="product-image"
                className="h-32 w-auto "
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.product_name}
                  </h2>
                  <div>
                    <span className="rounded bg-blue-100 px-2.5 py-1.5 text-xs font-semibold text-blue-800">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <div className="mb-5 mt-2.5 flex items-center">
                      {item.descrip}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
                  <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 px-3.5 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      {" "}
                      -{" "}
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                    />

                    <span className="cursor-pointer rounded-r bg-gray-100 px-3 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      {" "}
                      +{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-xl font-bold">{item.price}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${getTotalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Envio</p>
            <p className="text-gray-700">$4.990</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{totalPrice} CLP</p>
              <p className="text-sm text-gray-700">incluye IVA</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}
