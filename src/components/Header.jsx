import { useState, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiChevronDown, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { products } = useProducts();

  const navLinkClass = ({ isActive }) => 
    `transition-all duration-300 font-medium ${
      isActive 
        ? 'text-[#00450D] font-bold' 
        : 'text-[#44483D] hover:text-[#00450D]'
    }`;

  const mobileNavLinkClass = ({ isActive }) => 
    `block text-2xl font-bold py-4 border-b border-outline-variant/10 ${
      isActive ? 'text-[#00450D]' : 'text-[#44483D]'
    }`;

  const quickCollections = ['Indoor', 'Outdoor', 'Flowering', 'Rare', 'Succulents'];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, products]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#F9FBE7]/80 backdrop-blur-xl fluid-px py-4 max-w-full mx-auto border-b border-primary/5 shadow-sm shadow-primary/5">
        <div className="flex justify-between items-center relative">
          {/* Left: Brand */}
          <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tighter text-[#00450D] font-headline relative z-50">
            Oasí.
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/browse" className={navLinkClass}>Plants</NavLink>
            
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 transition-all duration-300 font-medium text-[#44483D] hover:text-[#00450D] py-2">
                About <FiChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 border border-outline-variant/30">
                <Link to="/about" className="block px-4 py-2.5 text-sm text-[#44483D] hover:bg-surface-container-high hover:text-[#00450D] transition-colors rounded-lg mx-2">Our Story</Link>
                <Link to="/contact" className="block px-4 py-2.5 text-sm text-[#44483D] hover:bg-surface-container-high hover:text-[#00450D] transition-colors rounded-lg mx-2">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Right: Actions & Hamburg */}
          <div className="flex items-center space-x-1 md:space-x-4 relative z-50">
            {/* Search Icon Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#00450D] hover:bg-primary/5 rounded-full transition-colors"
            >
              <FiSearch className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <Link to="/cart" className="relative group cursor-pointer p-2.5 hover:bg-primary/5 rounded-full transition-colors">
              <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#00450D]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-secondary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Button */}
            <button 
              className="md:hidden p-2.5 text-[#00450D] hover:bg-primary/5 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Popup Modal */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => {
          setIsSearchOpen(false);
          setSearchQuery('');
        }}></div>
        
        <div className={`absolute top-20 md:top-24 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl transition-all duration-500 overflow-hidden ${isSearchOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}`}>
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-3 md:gap-4 bg-surface-container-high/50 rounded-2xl px-5 py-3 md:px-6 md:py-4 mb-6 md:mb-8">
              <FiSearch className="w-5 h-5 md:w-6 md:h-6 text-on-surface-variant opacity-50" />
              <input 
                autoFocus={isSearchOpen}
                className="bg-transparent border-none focus:ring-0 text-base md:text-lg font-body outline-none w-full text-on-surface" 
                placeholder="Search collections..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-on-surface-variant/50 hover:text-primary transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              )}
              <div className="w-px h-6 bg-outline-variant mx-1"></div>
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <FiX className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {searchQuery.trim() ? (
              <div className="space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide pr-2">
                <h5 className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] ml-2">Smart Suggestions</h5>
                <div className="space-y-2">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <Link 
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-2xl md:rounded-3xl hover:bg-surface-container-high transition-all group"
                      >
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden bg-surface-container shrink-0">
                          <img 
                            src={product.images ? product.images[0] : product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors truncate">{product.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] md:text-xs text-on-surface-variant font-medium">{product.category}</span>
                            <span className="text-[10px] md:text-xs font-black text-on-surface">{product.price}</span>
                          </div>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-on-surface-variant opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-on-surface-variant font-medium">No specimens found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Quick Search</h5>
                <div className="flex flex-wrap gap-2">
                  {quickCollections.map(col => (
                    <button 
                      key={col}
                      onClick={() => setSearchQuery(col)}
                      className="px-5 py-2 md:px-6 md:py-2.5 rounded-xl md:rounded-2xl bg-surface-container-low text-on-surface font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="pt-32 px-10 flex flex-col space-y-2">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Home</NavLink>
          <NavLink to="/browse" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Catalogue</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Story</NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Contact</NavLink>
          
          <div className="pt-20 border-t border-outline-variant/10">
            <h5 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-6">Expert Solutions</h5>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl bg-surface-container-low">
                  <p className="text-xs font-bold text-primary">Wholesale</p>
               </div>
               <div className="p-4 rounded-2xl bg-surface-container-low">
                  <p className="text-xs font-bold text-primary">Logistics</p>
               </div>
            </div>
          </div>
          
          <div className="pt-12">
            <p className="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase opacity-40">© 2026 Oasí. Botanical Systems</p>
          </div>
        </div>
      </div>

    </>
  );
}

