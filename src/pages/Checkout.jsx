import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Checkout = () => {
  const { cart, getCartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [form, setForm] = useState({
    name: user?.username || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    card: '',
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      clearCart();
      setOrderComplete(true);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-12 px-8">
        <div className="text-center">
          <span className="text-5xl block mb-6">✅</span>
          <h1 className="font-serif text-4xl italic text-gray-900 mb-4">Order Complete!</h1>
          <p className="text-gray-500 mb-2">Thank you for your purchase. You will receive a confirmation email.</p>
          <p className="bg-beige-100 py-3 px-6 my-6 font-mono text-sm inline-block">
            Order #SH-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <div>
            <Link to="/" className="inline-block mt-8 px-12 py-4 bg-gray-900 text-beige-50 text-xs uppercase tracking-widest font-semibold no-underline transition-all duration-300 hover:bg-accent hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-12 px-8">
        <div className="text-center">
          <h2 className="font-serif text-2xl italic text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/products" className="inline-block mt-4 px-12 py-4 bg-gray-900 text-beige-50 text-xs uppercase tracking-widest font-semibold no-underline transition-all duration-300 hover:bg-accent hover:text-white">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <h1 className="font-serif text-5xl italic text-gray-900 mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">
        <form onSubmit={handleSubmit}>
          <h2 className="font-sans text-[11px] uppercase tracking-widest mb-8 text-gray-900 font-semibold">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">City</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} required className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Zip Code</label>
              <input type="text" name="zip" value={form.zip} onChange={handleChange} required className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
            </div>
          </div>

          <h2 className="font-sans text-[11px] uppercase tracking-widest mb-8 mt-12 pt-12 border-t border-beige-200 text-gray-900 font-semibold">
            Payment Information
          </h2>
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Card Number</label>
            <input type="text" name="card" value={form.card} onChange={handleChange} placeholder="1234 5678 9012 3456" required className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
          </div>

          <button type="submit" className="w-full bg-gray-900 text-beige-50 border-none py-4 text-xs uppercase tracking-widest font-semibold cursor-pointer mt-4 transition-all duration-300 hover:bg-accent hover:text-white">
            Pay {formatPrice(getCartTotal())}
          </button>
        </form>

        <div className="sticky top-24 p-8 bg-beige-100">
          <h3 className="font-sans text-[11px] uppercase tracking-widest mb-8 text-gray-900 font-semibold">
            Order Summary
          </h3>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b border-beige-200">
              <img src={item.image} alt={item.title} className="w-[60px] h-[60px] object-contain bg-white p-1" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-sm text-gray-900 line-clamp-1">{item.title}</span>
                <span className="text-[11px] uppercase text-gray-500">x{item.quantity}</span>
              </div>
              <span className="font-semibold text-gray-900 text-sm">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between py-6 text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;