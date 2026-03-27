import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white animate-pulse">
            <div className="w-full aspect-[3/4] bg-beige-100"></div>
            <div className="py-6 space-y-3">
              <div className="h-3 bg-beige-100 rounded w-1/4"></div>
              <div className="h-4 bg-beige-100 rounded w-3/4"></div>
              <div className="h-4 bg-beige-100 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Error loading products: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-8 py-3 bg-transparent border border-gray-900 text-gray-900 text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:text-beige-50"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;