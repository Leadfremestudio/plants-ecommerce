import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function Checkout() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = 48500; // Hardcoded for demo based on cart
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-24 px-8 max-w-3xl mx-auto text-center">
        <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-8">
          <FiCheckCircle className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 font-headline tracking-tight">Order Confirmed!</h1>
        <p className="text-xl text-on-surface-variant font-body mb-10">Thank you for your wholesale order. Our team will contact you shortly to confirm delivery details.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-primary mb-10 font-headline tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30">
            <h2 className="text-2xl font-bold text-primary mb-8 font-headline">Contact Details & Shipping</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">Full Name / Company Name *</label>
                  <input required type="text" className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Green Thumb Landscaping" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">Email Address *</label>
                  <input required type="email" className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="contact@company.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface">Phone Number *</label>
                <input required type="tel" className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="+91 98765 43210" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface">Delivery Address *</label>
                <textarea required rows={3} className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Street address, P.O. box, company name, c/o" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">City *</label>
                  <input required type="text" className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Mumbai" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">State *</label>
                  <input required type="text" className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Maharashtra" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">Pin Code *</label>
                  <input required type="text" className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary outline-none" placeholder="400001" />
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-low p-8 rounded-2xl sticky top-24">
            <h2 className="text-2xl font-bold text-primary mb-6 font-headline">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoEE-BtTsenkcunSjDj158TXVn_F1Zg5ovoz7uA56PammsE7pKs1g6ojCMWPFaFKcyTtbqDxexvYf930PZZ7DsFLaS9xMi99yrp6My-3-sC3r1LBXmqFMJollEiZHXocX3ioqsmMENACC1VDf9FnNoEHD6lkYwuMZNGhuCF0Wici3w9eOEWApR7QKb1eA8flL5pm6Q5DJg_40qgmaJEAgR8tS6bBWchzK16HvcAxpqMI2YTs7Q51Lu-E7uRVjfT3zcLQqVpJJ5I4JF" alt="Ficus Lyrata" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-on-surface">Ficus Lyrata</h4>
                  <p className="text-xs text-on-surface-variant">Qty: 5</p>
                </div>
                <div className="font-bold text-sm text-on-surface">₹22,500</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpoVoIP5VyKg5XhVToGg0Q4EkOBdFuAG7ZJZ5_csB_EDqlaubmpqjqNQyXtATzFZT0HH-Bcgu2wMUZQktZ79CzHdEJmMfl-ASmRv0ZF2epNL7YTDBE6Lp6ZGPCQv3GBXbRw4A1tSFO8dRaFCJHnABuLpdZMY5yWnlb_8V1nj6SKFtyMch5yaYlM3E3t40pOvqMXoaKipDD441vHUydWpoFPBo_r_ai8QGfAkP7CpKsjUwE33jNYvvmEViQMbHZw-10gvVwEYVXPcAj" alt="Zonal Geranium" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-on-surface">Zonal Geranium</h4>
                  <p className="text-xs text-on-surface-variant">Qty: 10</p>
                </div>
                <div className="font-bold text-sm text-on-surface">₹26,000</div>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-on-surface font-body border-t border-outline-variant/30 pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-primary">₹{shipping.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-outline-variant/30 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-on-surface font-headline">Total</span>
                <span className="text-3xl font-extrabold text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
