import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-12 px-8">
        <div className="text-center">
          <span className="text-5xl block mb-6 opacity-30">🛒</span>
          <h2 className="font-serif text-3xl italic mb-3 text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-sm">Add products to start shopping</p>
          <Link to="/products" className="inline-block px-12 py-4 bg-gray-900 text-beige-50 text-xs uppercase tracking-widest font-semibold no-underline transition-all duration-300 hover:bg-accent hover:text-white">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="font-serif text-5xl italic text-gray-900">Shopping Bag</h1>
        <button 
          className="bg-transparent border-none text-gray-500 text-xs uppercase tracking-wider cursor-pointer transition-colors hover:text-red-500"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 items-start">
        <div>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="sticky top-24 p-8 bg-beige-100">
          <h3 className="font-sans text-[11px] uppercase tracking-widest mb-8 text-gray-900 font-semibold">
            Order Summary
          </h3>
          <div className="flex justify-between py-3 border-b border-beige-200 text-gray-500 text-sm">
            <span>Subtotal ({cart.length} items)</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-beige-200 text-gray-500 text-sm">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between py-6 text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <Link to="/checkout" className="block w-full bg-gray-900 text-beige-50 text-center py-4 text-xs uppercase tracking-widest font-semibold no-underline transition-all duration-300 hover:bg-accent hover:text-white">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="block text-center mt-6 text-gray-500 no-underline text-xs uppercase tracking-wider hover:text-gray-900">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;