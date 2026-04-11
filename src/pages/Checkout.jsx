import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { cartItems, cartSubtotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('checkout_form');
    return savedData ? JSON.parse(savedData) : {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('checkout_form', JSON.stringify(formData));
  }, [formData]);

  const shipping = 0; // Free shipping for nursery direct
  const total = cartSubtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatWhatsAppMessage = () => {
    let message = ` *New Order from Oasí.* \n\n`;
    message += ` *Customer Details:*\n`;
    message += `----------------------------\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n`;
    
    message += ` *Order Items:*\n`;
    message += `----------------------------\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category})\n`;
      message += `   Qty: ${item.quantity} x ₹${item.priceValue.toLocaleString()} = ₹${(item.priceValue * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n *Summary:*\n`;
    message += `----------------------------\n`;
    message += `Subtotal: ₹${cartSubtotal.toLocaleString()}\n`;
    message += `Shipping: FREE\n`;
    message += `*Total Amount: ₹${total.toLocaleString()}*\n\n`;
    message += ` Please confirm my order!`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const waNumber = "919747830192";
    const waMessage = formatWhatsAppMessage();
    window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-24 px-8 max-w-3xl mx-auto text-center min-h-[80vh] flex flex-col justify-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary border-2 border-primary/20">
          <FiCheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 font-headline tracking-tight">Order Initiated!</h1>
        <p className="text-xl text-on-surface-variant font-body mb-10">We've redirected you to WhatsApp to finalize your order. Our team will verify the details and coordinate delivery with you.</p>
        <div className="p-8 border-2 border-dashed border-primary/10 rounded-[32px] bg-primary/5 mb-10 text-left max-w-md mx-auto">
           <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
             <FiMessageCircle /> Next Steps:
           </h3>
           <ol className="text-sm space-y-3 text-on-surface-variant list-decimal pl-4">
             <li>Send the pre-filled message on WhatsApp.</li>
             <li>Our executive will send you the UPI/Payment link.</li>
             <li>Once paid, we'll share your tracking ID.</li>
           </ol>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all shadow-xl shadow-primary/20"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 px-8 max-w-3xl mx-auto text-center min-h-[80vh] flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-primary mb-6 font-headline">Your cart is empty</h1>
        <p className="text-lg text-on-surface-variant font-body mb-8">Please add some items to your cart before proceeding to checkout.</p>
        <button 
          onClick={() => navigate('/browse')}
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-all"
        >
          Browse Plants
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-10 font-headline tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest p-8 rounded-[32px] border border-outline-variant/30 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-8 font-headline">Shipping & Billing</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface ml-1">Full Name *</label>
                  <input 
                    required 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface ml-1">Email Address *</label>
                  <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface ml-1">Phone Number *</label>
                <input 
                  required 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" 
                  className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all" 
                  placeholder="+91 98765 43210" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface ml-1">Delivery Address *</label>
                <textarea 
                  required 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3} 
                  className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all resize-none" 
                  placeholder="Flat, House no., Building, Company, Apartment" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface ml-1">City *</label>
                  <input 
                    required 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all" 
                    placeholder="Mumbai" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface ml-1">State *</label>
                  <input 
                    required 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all" 
                    placeholder="Maharashtra" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface ml-1">Pin Code *</label>
                  <input 
                    required 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full bg-surface-container-high/50 border-2 border-primary/5 focus:border-primary/20 rounded-2xl px-5 py-4 text-on-surface focus:ring-0 outline-none transition-all" 
                    placeholder="400001" 
                  />
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
                >
                  <FiMessageCircle className="w-6 h-6" /> Complete Order on WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#F9FBE7]/80 backdrop-blur-xl p-8 rounded-[32px] border border-primary/10 sticky top-24 shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-8 font-headline">Summary Overview</h2>
            
            <div className="space-y-4 mb-8">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-primary/5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-primary/10">
                    <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-primary line-clamp-1">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-on-surface-variant font-medium">Qty: {item.quantity}</span>
                      <span className="font-bold text-xs text-on-surface">₹{(item.priceValue * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-on-surface font-body border-t border-primary/10 pt-6">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="font-medium">Order Subtotal</span>
                <span className="font-bold text-on-surface">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-primary/5 p-3 rounded-xl border border-primary/10">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Calculated Shipping</span>
                <span className="font-black text-primary">FREE</span>
              </div>
            </div>
            
            <div className="border-t border-primary/20 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary font-headline uppercase tracking-wider">Net Amount</span>
                <span className="text-2xl font-bold text-primary font-headline tracking-tighter">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white/40 rounded-2xl border border-primary/10">
               <p className="text-[10px] text-on-surface-variant/80 font-medium leading-relaxed italic">
                 "Our specialized nursery logistics ensure your plants reach you in specimen condition. Delivery fees are waived for this curated collection."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
