import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuShoppingCart, LuChevronRight, LuStar, LuTruck, LuShieldCheck, LuLeaf } from 'react-icons/lu';
import QuantitySelector from '../components/QuantitySelector';

export default function ProductDetail() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-on-surface-variant font-body mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <LuChevronRight className="w-4 h-4" />
        <Link to="/browse" className="hover:text-primary transition-colors">Indoor Plants</Link>
        <LuChevronRight className="w-4 h-4" />
        <span className="text-on-surface font-medium">Ficus Lyrata</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low relative">
            <img className="w-full h-full object-cover" alt="large glossy Ficus Lyrata Fiddle Leaf Fig in a professional nursery setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoEE-BtTsenkcunSjDj158TXVn_F1Zg5ovoz7uA56PammsE7pKs1g6ojCMWPFaFKcyTtbqDxexvYf930PZZ7DsFLaS9xMi99yrp6My-3-sC3r1LBXmqFMJollEiZHXocX3ioqsmMENACC1VDf9FnNoEHD6lkYwuMZNGhuCF0Wici3w9eOEWApR7QKb1eA8flL5pm6Q5DJg_40qgmaJEAgR8tS6bBWchzK16HvcAxpqMI2YTs7Q51Lu-E7uRVjfT3zcLQqVpJJ5I4JF" />
            <span className="absolute top-6 right-6 bg-primary-fixed text-on-primary-fixed text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">In Stock</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-primary">
              <img className="w-full h-full object-cover" alt="Ficus Lyrata leaf detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoEE-BtTsenkcunSjDj158TXVn_F1Zg5ovoz7uA56PammsE7pKs1g6ojCMWPFaFKcyTtbqDxexvYf930PZZ7DsFLaS9xMi99yrp6My-3-sC3r1LBXmqFMJollEiZHXocX3ioqsmMENACC1VDf9FnNoEHD6lkYwuMZNGhuCF0Wici3w9eOEWApR7QKb1eA8flL5pm6Q5DJg_40qgmaJEAgR8tS6bBWchzK16HvcAxpqMI2YTs7Q51Lu-E7uRVjfT3zcLQqVpJJ5I4JF" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/30 transition-colors">
              <img className="w-full h-full object-cover opacity-70" alt="Ficus Lyrata full plant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoEE-BtTsenkcunSjDj158TXVn_F1Zg5ovoz7uA56PammsE7pKs1g6ojCMWPFaFKcyTtbqDxexvYf930PZZ7DsFLaS9xMi99yrp6My-3-sC3r1LBXmqFMJollEiZHXocX3ioqsmMENACC1VDf9FnNoEHD6lkYwuMZNGhuCF0Wici3w9eOEWApR7QKb1eA8flL5pm6Q5DJg_40qgmaJEAgR8tS6bBWchzK16HvcAxpqMI2YTs7Q51Lu-E7uRVjfT3zcLQqVpJJ5I4JF" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/30 transition-colors">
              <img className="w-full h-full object-cover opacity-70" alt="Ficus Lyrata nursery setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoEE-BtTsenkcunSjDj158TXVn_F1Zg5ovoz7uA56PammsE7pKs1g6ojCMWPFaFKcyTtbqDxexvYf930PZZ7DsFLaS9xMi99yrp6My-3-sC3r1LBXmqFMJollEiZHXocX3ioqsmMENACC1VDf9FnNoEHD6lkYwuMZNGhuCF0Wici3w9eOEWApR7QKb1eA8flL5pm6Q5DJg_40qgmaJEAgR8tS6bBWchzK16HvcAxpqMI2YTs7Q51Lu-E7uRVjfT3zcLQqVpJJ5I4JF" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 font-headline tracking-tight">Ficus Lyrata</h1>
          <p className="text-xl text-on-surface-variant font-body mb-6">Fiddle Leaf Fig • Specimen Grade</p>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-amber-400">
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
              <LuStar className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm text-on-surface-variant font-body">4.9 (128 wholesale reviews)</span>
          </div>

          <div className="mb-10">
            <div className="text-3xl font-extrabold text-on-surface mb-2">₹4,500 <span className="text-lg text-on-surface-variant font-normal">/ unit</span></div>
            <p className="text-sm text-primary font-bold">Wholesale Tier: 10+ units drops to ₹3,900/unit</p>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-3 font-headline">Select Size</h3>
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-xl border-2 border-primary bg-primary-fixed/10 text-primary font-bold">5 Gallon</button>
                <button className="px-6 py-3 rounded-xl border-2 border-outline-variant text-on-surface-variant hover:border-primary transition-colors font-bold">10 Gallon</button>
                <button className="px-6 py-3 rounded-xl border-2 border-outline-variant text-on-surface-variant hover:border-primary transition-colors font-bold">15 Gallon</button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-3 font-headline">Quantity</h3>
              <div className="flex items-center gap-4">
                <QuantitySelector 
                  size="md"
                  quantity={quantity}
                  onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                  onIncrease={() => setQuantity(quantity + 1)}
                />
                <span className="text-sm text-on-surface-variant font-body">Minimum order: 5 units</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-12">
            <button 
              className="flex-1 bg-surface-container-highest text-on-surface py-4 rounded-xl font-bold text-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
              onClick={() => navigate('/cart')}
            >
              <LuShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button 
              className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors"
              onClick={() => navigate('/cart')}
            >
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-outline-variant/30">
            <div className="flex flex-col gap-2">
              <LuTruck className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-on-surface font-headline">Shipping</h4>
              <p className="text-xs text-on-surface-variant font-body">Palletized delivery available nationwide.</p>
            </div>
            <div className="flex flex-col gap-2">
              <LuShieldCheck className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-on-surface font-headline">Quality Guarantee</h4>
              <p className="text-xs text-on-surface-variant font-body">Inspected for pests and disease before dispatch.</p>
            </div>
            <div className="flex flex-col gap-2">
              <LuLeaf className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-on-surface font-headline">Acclimated</h4>
              <p className="text-xs text-on-surface-variant font-body">Grown in 60% shade for indoor readiness.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="mt-24">
        <div className="flex border-b border-outline-variant/30 mb-8">
          <button className="px-8 py-4 text-primary font-bold border-b-2 border-primary font-headline text-lg">Description</button>
          <button className="px-8 py-4 text-on-surface-variant font-medium hover:text-primary transition-colors font-headline text-lg">Care Guide</button>
          <button className="px-8 py-4 text-on-surface-variant font-medium hover:text-primary transition-colors font-headline text-lg">Shipping Specs</button>
        </div>
        <div className="max-w-3xl text-on-surface-variant font-body leading-relaxed space-y-6">
          <p>The Ficus lyrata, commonly known as the Fiddle Leaf Fig, is a highly sought-after specimen plant known for its large, heavily veined, violin-shaped leaves that grow upright on a sleek trunk. Our wholesale stock is grown specifically for interior environments, acclimated in shade houses to ensure a smooth transition to indoor commercial or residential spaces.</p>
          <p>These 5-gallon specimens are well-rooted, exhibiting strong trunk caliper and a full canopy of glossy, dark green foliage. Ideal for immediate installation in high-end landscape designs, office interiors, or retail garden centers.</p>
          <ul className="list-disc pl-5 space-y-2 text-on-surface">
            <li><strong>Botanical Name:</strong> Ficus lyrata</li>
            <li><strong>Common Name:</strong> Fiddle Leaf Fig</li>
            <li><strong>Light Requirement:</strong> Bright, indirect light</li>
            <li><strong>Watering:</strong> Allow top 2 inches of soil to dry between waterings</li>
            <li><strong>Soil:</strong> Well-draining, aerated potting mix</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
