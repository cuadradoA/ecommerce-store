import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-white transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="no-underline text-inherit flex flex-col">
        <div className="w-full aspect-[3/4] flex items-center justify-center p-8 bg-beige-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="py-6">
          <span className="block text-[11px] uppercase tracking-wider text-gray-500 mb-2 font-medium">
            {product.category}
          </span>
          <h3 className="font-sans text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed mb-3">
            {product.title}
          </h3>
          <span className="text-base font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>
      <button
        className="w-full bg-transparent border border-gray-900 text-gray-900 py-3 text-[11px] uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:text-beige-50"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
      >
        Add to Bag
      </button>
    </div>
  );
};

export default ProductCard;