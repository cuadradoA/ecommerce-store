import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../services/api';
import { useApp } from '../context/AppContext';
import ProductGrid from '../components/ProductGrid';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);

        if (productData.category) {
          const relatedData = await getProductsByCategory(productData.category);
          setRelated(relatedData.filter((p) => p.id !== parseInt(id)).slice(0, 4));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? '★' : '☆');
    }
    return stars.join('');
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        <div className="w-10 h-10 border-2 border-beige-200 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500">Error: {error}</p>
        <Link to="/products" className="text-accent no-underline mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500">Product not found</p>
        <Link to="/products" className="text-accent no-underline mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <nav className="flex gap-2 mb-12 text-[11px] uppercase tracking-wider text-gray-500">
        <Link to="/" className="text-gray-500 no-underline hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link to="/products" className="text-gray-500 no-underline hover:text-gray-900">Products</Link>
        <span>/</span>
        <span>{product.category}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="bg-beige-100 p-16 flex items-center justify-center aspect-square">
          <img src={product.image} alt={product.title} className="max-w-full max-h-[400px] object-contain" />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4 font-semibold">
            {product.category}
          </span>
          <h1 className="font-serif text-4xl text-gray-900 leading-tight mb-6">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-6 text-sm">
            <span className="text-accent tracking-wider">{renderStars(product.rating?.rate || 0)}</span>
            <span className="font-semibold">{product.rating?.rate || 0}</span>
            <span className="text-gray-500">({product.rating?.count || 0} reviews)</span>
          </div>

          <span className="text-3xl font-semibold text-gray-900 mb-8">
            {formatPrice(product.price)}
          </span>

          <p className="text-gray-500 leading-relaxed mb-8 text-sm">
            {product.description}
          </p>

          <div className="flex gap-4 items-center mb-8">
            <div className="flex items-center border border-gray-900">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-transparent border-none w-11 h-11 cursor-pointer text-xl text-gray-900 transition-colors hover:bg-beige-100"
              >
                −
              </button>
              <span className="font-semibold min-w-[44px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-transparent border-none w-11 h-11 cursor-pointer text-xl text-gray-900 transition-colors hover:bg-beige-100"
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-gray-900 text-beige-50 border-none py-4 text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 hover:bg-accent hover:text-white"
              onClick={() => {
                addToCart(product, quantity);
                setQuantity(1);
              }}
            >
              Add to Bag
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-8 border-t border-beige-200">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="text-green-600">✓</span> Free Shipping
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="text-green-600">✓</span> 30-Day Guarantee
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="text-green-600">✓</span> In Stock
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-16 border-t border-beige-200">
          <h2 className="font-serif text-3xl mb-8 text-gray-900">Related Products</h2>
          <ProductGrid products={related} loading={false} error={null} />
        </section>
      )}
    </div>
  );
};

export default ProductDetail;