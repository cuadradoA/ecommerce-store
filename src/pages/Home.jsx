import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLimitedProducts, getCategories } from '../services/api';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          getLimitedProducts(8),
          getCategories(),
        ]);
        setFeatured(products);
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-0 p-0">
      {/* Hero Section */}
      <section className="relative w-screen min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" 
          alt="Fashion editorial clothing" 
          className="absolute top-0 left-0 w-full h-full object-cover z-0" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/50 z-[1]"></div>
        <div className="relative z-[2] max-w-[700px] px-6">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-white/80 mb-8 font-semibold">
            Spring / Summer 2026
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-normal italic leading-[1.1] mb-6 text-white" style={{textShadow: '0 2px 20px rgba(0,0,0,0.3)'}}>
            The Legacy<br />Collection
          </h1>
          <p className="text-base text-white/80 mb-12 font-light tracking-wide">
            Curated essentials for the modern wardrobe
          </p>
          <Link to="/products" className="inline-block px-12 py-4 bg-white text-gray-900 text-xs uppercase tracking-widest font-semibold no-underline transition-all duration-300 hover:bg-accent hover:text-white">
            Explore the Drop
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-accent mb-4 font-semibold">
            Collections
          </span>
          <h2 className="font-serif text-4xl text-gray-900">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-beige-200">
          {categories.slice(0, 4).map((cat, index) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="flex flex-col p-12 bg-white no-underline transition-colors duration-300 hover:bg-beige-100 group"
            >
              <span className="text-[11px] text-accent mb-4 font-medium">0{index + 1}</span>
              <span className="font-serif text-2xl text-gray-900 capitalize mb-4">{cat}</span>
              <span className="text-2xl text-gray-500 mt-auto transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-accent mb-4 font-semibold">
            New Arrivals
          </span>
          <div className="flex justify-between items-baseline">
            <h2 className="font-serif text-4xl text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-xs uppercase tracking-wider text-gray-500 font-medium no-underline hover:text-gray-900">
              View All →
            </Link>
          </div>
        </div>
        <ProductGrid products={featured} loading={loading} error={error} />
      </section>

      {/* Banner Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gray-900 text-white py-24 px-8 my-24 text-center">
        <div className="max-w-[600px] mx-auto">
          <span className="block text-[11px] uppercase tracking-[0.3em] text-accent-light mb-4 font-semibold">
            Limited Edition
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal italic mb-6">
            Exclusive Capsule Collection
          </h2>
          <p className="text-base opacity-80 mb-8 leading-relaxed">
            Sign up for early access to our limited drops and exclusive releases
          </p>
          <Link to="/login" className="inline-block px-12 py-4 border border-white text-white text-xs uppercase tracking-widest font-semibold no-underline transition-all duration-300 hover:bg-white hover:text-gray-900">
            Join the List
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-16 px-8 border-t border-beige-200">
        <div className="text-center">
          <span className="block text-[11px] text-accent mb-4 font-semibold">01</span>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider mb-2 text-gray-900">Free Shipping</h3>
          <p className="text-sm text-gray-500">On orders over $100</p>
        </div>
        <div className="text-center">
          <span className="block text-[11px] text-accent mb-4 font-semibold">02</span>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider mb-2 text-gray-900">Easy Returns</h3>
          <p className="text-sm text-gray-500">30-day return policy</p>
        </div>
        <div className="text-center">
          <span className="block text-[11px] text-accent mb-4 font-semibold">03</span>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider mb-2 text-gray-900">Secure Payment</h3>
          <p className="text-sm text-gray-500">Encrypted transactions</p>
        </div>
      </section>
    </div>
  );
};

export default Home;