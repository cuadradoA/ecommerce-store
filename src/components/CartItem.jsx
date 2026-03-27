import { useApp } from '../context/AppContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="flex items-center gap-8 py-8 border-b border-beige-200">
      <img src={item.image} alt={item.title} className="w-[100px] h-[100px] object-contain bg-beige-100 p-2" />
      <div className="flex-1">
        <h3 className="font-sans text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed">{item.title}</h3>
        <span className="text-sm text-gray-500">{formatPrice(item.price)}</span>
      </div>
      <div className="flex items-center border border-beige-200">
        <button
          className="bg-transparent border-none w-9 h-9 cursor-pointer text-base text-gray-900 transition-colors hover:bg-beige-100"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>
        <span className="font-semibold min-w-[36px] text-center text-sm">{item.quantity}</span>
        <button
          className="bg-transparent border-none w-9 h-9 cursor-pointer text-base text-gray-900 transition-colors hover:bg-beige-100"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <span className="font-semibold text-gray-900 min-w-[80px] text-right text-sm">
        {formatPrice(item.price * item.quantity)}
      </span>
      <button
        className="bg-transparent border-none text-base cursor-pointer text-gray-500 p-2 transition-colors hover:text-red-500"
        onClick={() => removeFromCart(item.id)}
      >
        🗑️
      </button>
    </div>
  );
};

export default CartItem;