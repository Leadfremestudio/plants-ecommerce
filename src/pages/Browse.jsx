import { useState, useMemo } from 'react';
import { LuFilter, LuChevronDown, LuLoader } from 'react-icons/lu';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export default function Browse() {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Indoor', 'Outdoor', 'Flowering', 'Succulents', 'Trees', 'Rare'];
  const marketingTags = ['All', 'New', 'Featured', 'Premium', 'Best Seller'];

  const processedProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products;

    // Filter by Category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by Marketing Tag
    if (activeTag !== 'All') {
      filtered = filtered.filter(p => p.tag === activeTag);
    }

    switch(sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.priceValue - b.priceValue);
      case 'price-high':
        return [...filtered].sort((a, b) => b.priceValue - a.priceValue);
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [products, activeCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LuLoader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div>
          <h2 className="text-2xl font-bold text-error mb-4">Error loading catalog</h2>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 font-headline tracking-tight">Oasí. Archive</h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body">Browse our complete collection of refined botanical specimens.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Tag Filter Dropdown */}
          <div className="relative group w-full sm:w-auto">
            <select 
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
              className="appearance-none w-full sm:w-48 bg-surface-container px-6 py-3.5 rounded-xl font-medium text-on-surface hover:bg-surface-container-high transition-all cursor-pointer outline-none border border-primary/5"
            >
              <option value="All">All Collections</option>
              <option value="New">New Arrivals</option>
              <option value="Featured">Featured</option>
              <option value="Premium">Premium</option>
              <option value="Best Seller">Best Sellers</option>
            </select>
            <LuFilter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
          </div>

          <div className="relative group w-full sm:w-auto">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full sm:w-64 bg-surface-container-high px-6 py-3.5 rounded-xl font-medium text-on-surface hover:bg-surface-variant transition-all cursor-pointer outline-none border border-primary/5 shadow-sm"
            >
              <option value="featured">Sort Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
          </div>
        </div>
      </div>

      {/* Category Pills - Scrollable on mobile */}
      <div className="mb-12">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {processedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {processedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="border border-outline-variant/10" 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-surface-container-low rounded-3xl">
          <p className="text-xl text-on-surface-variant font-body mb-6">No botanical specimens found in this category.</p>
          <button 
            onClick={() => {
              setActiveCategory('All');
              setActiveTag('All');
            }}
            className="text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
