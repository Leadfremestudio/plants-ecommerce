import { useNavigate } from 'react-router-dom';
import { LuTrash2, LuArrowLeft } from 'react-icons/lu';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();

  const shipping = 0; // Free shipping
  const total = cartSubtotal + shipping;

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-10 font-headline tracking-tight">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="bg-surface-container-low p-12 rounded-[32px] text-center border-2 border-dashed border-outline-variant/30">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <LuTrash2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2 font-headline">Your cart is empty</h2>
              <p className="text-on-surface-variant font-body mb-8 max-w-xs mx-auto">Looks like you haven't added any greenery to your space yet.</p>
              <button 
                onClick={() => navigate('/browse')}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                Browse Our Collection
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="group flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[24px] border border-outline-variant/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden shrink-0 bg-surface-container-low">
                  <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary font-headline mb-1 hover:text-secondary transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                      <p className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-widest font-body">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-on-surface-variant/40 hover:text-error hover:bg-error/10 p-2.5 rounded-xl transition-all"
                      title="Remove from cart"
                    >
                      <LuTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-between items-end mt-6 gap-4">
                    <div className="bg-surface-container-low rounded-2xl p-1">
                      <QuantitySelector 
                        quantity={item.quantity}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-on-surface-variant/60 font-medium mb-1 line-through opacity-0">₹{(item.priceValue * 1.2).toLocaleString()}</div>
                      <div className="text-xl font-bold text-on-surface font-headline tracking-tight">
                        ₹{(item.priceValue * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#F9FBE7]/50 backdrop-blur-xl p-8 rounded-[32px] border border-primary/10 sticky top-24 shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-8 font-headline flex items-center gap-3">
              Order Summary
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{cartItems.length} Items</span>
            </h2>
            
            <div className="space-y-4 mb-8 text-on-surface font-body">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-on-surface">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">Estimated Shipping</span>
                <span className="font-bold text-[#00450D]">FREE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant font-medium">GST (Included)</span>
                <span className="font-bold text-on-surface">₹0</span>
              </div>
            </div>
            
            <div className="border-t border-primary/10 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary font-headline uppercase tracking-wider">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary font-headline tracking-tighter">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
                className="w-full bg-[#00450D] text-white py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-[#002B08] transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                Complete Purchase
              </button>
              <button 
                onClick={() => navigate('/browse')}
                className="w-full bg-white text-[#00450D] border-2 border-[#00450D]/10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <LuArrowLeft className="w-5 h-5" /> Back to Store
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-primary/10 flex items-center gap-4 text-[#44483D]/60 text-xs font-medium">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-white"></div>
                 ))}
               </div>
               <p>Joined by 2,000+ plant lovers this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
