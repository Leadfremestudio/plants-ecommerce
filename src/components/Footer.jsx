import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#EDF0DC] w-full py-12 px-8 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div>
          <div className="text-3xl font-extrabold text-[#00450D] mb-4 font-headline tracking-tighter">Oasí.</div>
          <p className="text-[#44483D] text-sm font-body leading-relaxed max-w-xs">Cultivating botanical excellence for professional landscape architects and interior designers since 1994.</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#00450D] uppercase tracking-widest mb-6 font-headline">Explore</h4>
          <ul className="space-y-4">
            <li><Link to="/browse" className="text-[#44483D] text-sm hover:text-primary transition-colors">Plants</Link></li>
            <li><Link to="/cart" className="text-[#44483D] text-sm hover:text-primary transition-colors">Your Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#00450D] uppercase tracking-widest mb-6 font-headline">Resources</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-[#44483D] text-sm hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="text-[#44483D] text-sm hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="#" className="text-[#44483D] text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-primary/10 text-center md:text-left">
        <p className="text-[#44483D] text-xs font-body tracking-wide opacity-70">© 2026 Oasí. All rights reserved.</p>
      </div>
    </footer>
  );
}
