import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuTrash2, LuArrowLeft } from 'react-icons/lu';
import QuantitySelector from '../components/QuantitySelector';

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ficus Lyrata',
      category: 'Indoor',
      price: 4500,
      quantity: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoEE-BtTsenkcunSjDj158TXVn_F1Zg5ovoz7uA56PammsE7pKs1g6ojCMWPFaFKcyTtbqDxexvYf930PZZ7DsFLaS9xMi99yrp6My-3-sC3r1LBXmqFMJollEiZHXocX3ioqsmMENACC1VDf9FnNoEHD6lkYwuMZNGhuCF0Wici3w9eOEWApR7QKb1eA8flL5pm6Q5DJg_40qgmaJEAgR8tS6bBWchzK16HvcAxpqMI2YTs7Q51Lu-E7uRVjfT3zcLQqVpJJ5I4JF'
    },
    {
      id: 2,
      name: 'Zonal Geranium',
      category: 'Flowering',
      price: 2600,
      quantity: 10,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpoVoIP5VyKg5XhVToGg0Q4EkOBdFuAG7ZJZ5_csB_EDqlaubmpqjqNQyXtATzFZT0HH-Bcgu2wMUZQktZ79CzHdEJmMfl-ASmRv0ZF2epNL7YTDBE6Lp6ZGPCQv3GBXbRw4A1tSFO8dRaFCJHnABuLpdZMY5yWnlb_8V1nj6SKFtyMch5yaYlM3E3t40pOvqMXoaKipDD441vHUydWpoFPBo_r_ai8QGfAkP7CpKsjUwE33jNYvvmEViQMbHZw-10gvVwEYVXPcAj'
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="pt-24 pb-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-primary mb-10 font-headline tracking-tight">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="bg-surface-container-low p-8 rounded-2xl text-center">
              <p className="text-on-surface-variant font-body mb-4">Your cart is currently empty.</p>
              <button 
                onClick={() => navigate('/browse')}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-primary font-headline">{item.name}</h3>
                      <p className="text-sm text-on-surface-variant font-body">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-error hover:bg-error-container p-2 rounded-lg transition-colors"
                    >
                      <LuTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <QuantitySelector 
                      quantity={item.quantity}
                      onDecrease={() => updateQuantity(item.id, -1)}
                      onIncrease={() => updateQuantity(item.id, 1)}
                    />
                    <div className="text-right">
                      <div className="text-sm text-on-surface-variant mb-1">₹{item.price.toLocaleString()} each</div>
                      <div className="text-xl font-extrabold text-on-surface">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-low p-8 rounded-2xl sticky top-24">
            <h2 className="text-2xl font-bold text-primary mb-6 font-headline">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-on-surface font-body">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-primary">₹{shipping.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-outline-variant/30 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-on-surface font-headline">Total</span>
                <span className="text-3xl font-extrabold text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => navigate('/browse')}
                className="w-full bg-transparent border-2 border-primary text-primary py-4 rounded-xl font-bold text-lg hover:bg-primary-fixed/10 transition-colors flex items-center justify-center gap-2"
              >
                <LuArrowLeft className="w-5 h-5" /> Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
