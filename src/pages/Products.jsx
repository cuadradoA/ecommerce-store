import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, getCategories, getProductsByCategory } from '../services/api';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats);

      if (categoryParam) {
        setSelectedCategory(categoryParam);
        const data = await getProductsByCategory(categoryParam);
        setProducts(data);
        setFilteredProducts(data);
      } else {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      if (category) {
        const data = await getProductsByCategory(category);
        setProducts(data);
      } else {
        const data = await getAllProducts();
        setProducts(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="font-serif text-5xl italic text-gray-900">All Products</h1>
        <span className="text-xs uppercase tracking-wider text-gray-500">
          {filteredProducts.length} products found
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-beige-200">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider"
        />
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="py-3 pr-8 bg-transparent border-b border-beige-200 text-gray-900 text-sm min-w-[160px] cursor-pointer focus:outline-none focus:border-gray-900 appearance-none"
          style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%231A1A1A' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center'}}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="py-3 pr-8 bg-transparent border-b border-beige-200 text-gray-900 text-sm min-w-[160px] cursor-pointer focus:outline-none focus:border-gray-900 appearance-none"
          style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%231A1A1A' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center'}}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Best Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <ProductGrid products={filteredProducts} loading={loading} error={error} />
    </div>
  );
};

export default Products;