import React, { useState, useEffect } from 'react';
import { Calculator } from './components/Calculator';
import { GrindCoach } from './components/GrindCoach';
import { OrderState } from './types';
import { PRICING } from './constants';

const App = () => {
  const [order, setOrder] = useState<OrderState>({
    gems: 0,
    xp: 0,
    streaks: 0
  });

  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const gemPrice = (order.gems / 1000) * PRICING.gemsPer1000;
    const xpPrice = (order.xp / 1000) * PRICING.xpPer1000;
    const streakPrice = order.streaks * PRICING.streakPerUnit;
    setTotal(gemPrice + xpPrice + streakPrice);
  }, [order]);

  const handleCheckout = () => {
    if (total === 0) return;
    setShowCheckout(true);
    setTimeout(() => {
      setShowCheckout(false);
      setOrder({ gems: 0, xp: 0, streaks: 0 });
      alert("Order 'processed' successfully! (This is a mock, no charge was made. Keep grinding!)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#0b111e] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fas fa-rocket text-green-500 text-2xl"></i>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Duo<span className="text-green-500">Boost</span>
            </h1>
          </div>
          <div className="flex gap-4 items-center">
             <span className="text-sm text-gray-400 hidden sm:block">No more grinding. Just winning.</span>
             <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-bold border border-gray-700 transition">
               Login
             </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <section className="text-center mb-16 mt-8">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Level Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Instantly</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Why spend hours translating sentences about apples when you can calculate the exact cost of your freedom? 
            <span className="block mt-2 text-sm text-gray-500">*We are not affiliated with Duolingo. This is a calculator tool.*</span>
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Calculator */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-3xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-calculator text-green-500"></i> Service Calculator
              </h3>
              <Calculator order={order} setOrder={setOrder} />
            </div>
          </div>

          {/* Right Column: Checkout & Coach */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Checkout Card (Sticky-ish) */}
            <div className="bg-gray-800 rounded-3xl p-6 border-2 border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold text-gray-300 mb-4 uppercase tracking-wider text-sm">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {order.gems > 0 && (
                  <div className="flex justify-between text-blue-300">
                    <span>{order.gems.toLocaleString()} Gems</span>
                    <span>${((order.gems / 1000) * PRICING.gemsPer1000).toFixed(2)}</span>
                  </div>
                )}
                {order.xp > 0 && (
                  <div className="flex justify-between text-yellow-300">
                    <span>{order.xp.toLocaleString()} XP</span>
                    <span>${((order.xp / 1000) * PRICING.xpPer1000).toFixed(2)}</span>
                  </div>
                )}
                {order.streaks > 0 && (
                  <div className="flex justify-between text-orange-300">
                    <span>{order.streaks} Streak Days</span>
                    <span>${(order.streaks * PRICING.streakPerUnit).toFixed(2)}</span>
                  </div>
                )}
                {total === 0 && (
                  <div className="text-gray-500 text-center py-4 italic">
                    Select services to see pricing
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 font-bold">Total</span>
                  <span className="text-4xl font-extrabold text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={total === 0 || showCheckout}
                className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide feather-button 
                  ${total > 0 ? 'bg-green-500 text-green-950 feather-button-green hover:bg-green-400' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
                `}
              >
                {showCheckout ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>

            {/* AI Coach */}
            <GrindCoach />

          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-16">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500 transition duration-300 text-center">
            <i className="fas fa-bolt text-4xl text-yellow-400 mb-4"></i>
            <h4 className="text-xl font-bold mb-2">Instant Delivery</h4>
            <p className="text-gray-400 text-sm">Our automated systems (mock systems) process requests instantly.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500 transition duration-300 text-center">
            <i className="fas fa-shield-alt text-4xl text-blue-400 mb-4"></i>
            <h4 className="text-xl font-bold mb-2">Safe & Secure</h4>
            <p className="text-gray-400 text-sm">No account access required. We calculate using safe math algorithms.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500 transition duration-300 text-center">
            <i className="fas fa-headset text-4xl text-green-400 mb-4"></i>
            <h4 className="text-xl font-bold mb-2">24/7 AI Support</h4>
            <p className="text-gray-400 text-sm">Ask our Gemini-powered Grind Coach for legitimate tips anytime.</p>
          </div>
        </div>

      </main>

      <footer className="bg-[#0b111e] border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DuoBoost Calculator. All rights reserved.</p>
        <p className="mt-2">
          Disclaimer: This is a demo application for educational purposes only. 
          It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Duolingo.
          No real transactions occur here.
        </p>
      </footer>
    </div>
  );
};

export default App;