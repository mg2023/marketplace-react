import { useContext } from "react";
import Context from "../../context/Context";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(Context);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
      // Update cartItems state with updatedCartItems
    }
  };

  const totalPrice =
    parseFloat(getTotalPrice().replace(/[^0-9.-]+/g, "")) + 4900;

  return (
    <div className="mb-20 h-full bg-bgback pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className=" rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className=" mb-6 justify-between rounded-lg border p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                src={item.url_img}
                alt="product-image"
                className="h-32 w-auto rounded-md object-cover"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold">{item.product_name}</h2>
                  <div>
                    <span className="rounded bg-secondary px-2.5 py-1.5 text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-8 text-xl font-semibold text-primary">
                    ${item.price}
                  </div>
                </div>
                <div className="relative mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
                  <div className="flex items-center border-gray-100">
                    <button
                      className="cursor-pointer bg-secondary px-2.5 py-1.5 hover:bg-secondaryHover"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      className="h-8 w-16 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      className="cursor-pointer bg-secondary px-2.5 py-1.5 hover:bg-secondaryHover"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="xs:right-0 absolute right-0 top-0 md:top-20 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="#FFF"
                      className="h-8 w-8 cursor-pointer rounded-full bg-secondary p-2 duration-150 hover:bg-secondaryHover"
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
        <div className="bg-bgFront mt-6 h-full rounded-lg border p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="">Subtotal</p>
            <p className="">${getTotalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p className="">Envio</p>
            <p className="">$4.990</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{totalPrice} CLP</p>
              <p className="text-sm ">incluye IVA</p>
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
