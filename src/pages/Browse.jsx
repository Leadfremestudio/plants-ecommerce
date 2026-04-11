import { useState, useMemo } from 'react';
import { LuFilter, LuChevronDown } from 'react-icons/lu';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Browse() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Indoor', 'Outdoor', 'Flowering', 'Succulents', 'Trees', 'Rare'];

  const processedProducts = useMemo(() => {
    let filtered = activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);

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
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 font-headline tracking-tight">Oasí. Archive</h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body">Browse our complete collection of refined botanical specimens.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-auto">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full sm:w-64 bg-surface-container-high px-6 py-3.5 rounded-xl font-medium text-on-surface hover:bg-surface-variant transition-all cursor-pointer outline-none border border-primary/5 shadow-sm"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
          </div>
        </div>
      </div>

      {/* Category Pills - Scrollable on mobile */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
              activeCategory === category 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
            }`}
          >
            {category}
          </button>
        ))}
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
            onClick={() => setActiveCategory('All')}
            className="text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
