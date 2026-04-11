import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();

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

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#F9FBE7]/80 backdrop-blur-xl px-8 py-4 max-w-full mx-auto border-b border-primary/5 shadow-sm shadow-primary/5">
        <div className="flex justify-between items-center relative">
          {/* Left: Brand */}
          <Link to="/" className="text-3xl font-extrabold tracking-tighter text-[#00450D] font-headline relative z-50">
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
          <div className="flex items-center space-x-2 md:space-x-6 relative z-50">
            {/* Search Icon Toggle */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#00450D] hover:bg-primary/5 rounded-full transition-colors"
            >
              <FiSearch className="w-6 h-6" />
            </button>
            
            <Link to="/cart" className="relative group cursor-pointer p-2 hover:bg-primary/5 rounded-full transition-colors">
              <FiShoppingCart className="w-6 h-6 text-[#00450D]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Button */}
            <button 
              className="md:hidden p-2 text-[#00450D] hover:bg-primary/5 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Popup Modal */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}></div>
        
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl bg-white rounded-[40px] shadow-2xl transition-all duration-500 overflow-hidden ${isSearchOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}`}>
          <div className="p-8">
            <div className="flex items-center gap-4 bg-surface-container-high/50 rounded-2xl px-6 py-4 mb-8">
              <FiSearch className="w-6 h-6 text-on-surface-variant opacity-50" />
              <input 
                autoFocus={isSearchOpen}
                className="bg-transparent border-none focus:ring-0 text-lg font-body outline-none w-full text-on-surface" 
                placeholder="Search Oasí. collections..." 
                type="text" 
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Quick Search Collections</h5>
              <div className="flex flex-wrap gap-2">
                {quickCollections.map(col => (
                  <button 
                    key={col}
                    className="px-6 py-2.5 rounded-2xl bg-surface-container-low text-on-surface font-bold text-sm hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-surface-container-lowest transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="pt-24 px-8 flex flex-col items-center text-center space-y-2">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Home</NavLink>
          <NavLink to="/browse" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Plants</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Our Story</NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>Contact Us</NavLink>
          
          <div className="pt-12">
            <p className="text-[#44483D] text-sm opacity-60">© 2026 Oasí. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
