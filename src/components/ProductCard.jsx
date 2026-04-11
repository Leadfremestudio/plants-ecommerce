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
    addToCart(product);
  };

  return (
    <div 
      className={`group bg-surface-container-lowest rounded-xl overflow-hidden transition-all hover:translate-y-[-8px] cursor-pointer shadow-sm hover:shadow-xl ${className}`}
      onClick={handleProductClick}
    >
      <div className="h-64 overflow-hidden relative">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={product.name} 
          src={product.images ? product.images[0] : product.image} 
        />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-primary mb-1 font-headline">{product.name}</h4>
        <p className="text-sm text-on-surface-variant mb-4 font-body">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-on-surface">{product.price}</span>
          <button 
            className="group/cart relative w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
            onClick={handleAddToCart}
          >
            <LuShoppingCart className="w-5 h-5" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/cart:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg translate-y-2 group-hover/cart:translate-y-0">
               Add to Cart
               <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
