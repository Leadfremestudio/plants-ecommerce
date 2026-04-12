import { useNavigate } from 'react-router-dom';
import { LuShoppingCart } from 'react-icons/lu';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, className = "" }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
    }
  };

  return (
    <div 
      className={`group bg-surface-container-lowest rounded-xl overflow-hidden transition-all hover:translate-y-[-8px] cursor-pointer shadow-sm hover:shadow-xl ${className} ${!product.inStock ? 'opacity-75' : ''}`}
      onClick={handleProductClick}
    >
      <div className="h-64 overflow-hidden relative">
        <img 
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${!product.inStock ? 'grayscale' : ''}`} 
          alt={product.name} 
          src={product.images ? product.images[0] : product.image} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop';
          }}
        />
        {!product.inStock && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-error/90 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-primary mb-1 font-headline">{product.name}</h4>
        <div className="flex gap-2 mb-4">
          <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-md border border-outline-variant/30">
            {product.category}
          </span>
          {product.tag !== 'None' && product.tag !== 'New' && (
            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/20">
              {product.tag}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-on-surface">{product.price}</span>
          <button 
            disabled={!product.inStock}
            className={`group/cart relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              product.inStock 
                ? 'bg-primary text-white hover:bg-secondary' 
                : 'bg-outline-variant text-on-surface/30 cursor-not-allowed'
            }`}
            onClick={handleAddToCart}
          >
            <LuShoppingCart className="w-5 h-5" />
            {product.inStock && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/cart:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg translate-y-2 group-hover/cart:translate-y-0">
                 Add to Cart
                 <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
