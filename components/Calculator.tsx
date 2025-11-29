import React from 'react';
import { OrderState } from '../types';
import { PRICING } from '../constants';

interface CalculatorProps {
  order: OrderState;
  setOrder: React.Dispatch<React.SetStateAction<OrderState>>;
}

export const Calculator: React.FC<CalculatorProps> = ({ order, setOrder }) => {
  
  const handleChange = (field: keyof OrderState, value: number) => {
    // Prevent negative values
    const safeValue = Math.max(0, value);
    setOrder(prev => ({ ...prev, [field]: safeValue }));
  };

  return (
    <div className="space-y-8">
      {/* Gems Section */}
      <div className="bg-gray-800 p-6 rounded-2xl border-2 border-blue-500 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fas fa-gem text-9xl text-blue-400"></i>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-blue-400"><i className="fas fa-gem mr-2"></i> Gems</h3>
            <span className="text-sm bg-blue-900 text-blue-300 px-3 py-1 rounded-full border border-blue-500">
              ${PRICING.gemsPer1000.toFixed(2)} / 1k
            </span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="50000" 
            step="1000"
            value={order.gems}
            onChange={(e) => handleChange('gems', parseInt(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
          />
          
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={order.gems}
              onChange={(e) => handleChange('gems', parseInt(e.target.value))}
              className="bg-gray-900 border border-gray-600 text-white text-lg rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Amount"
            />
            <div className="text-right w-32">
              <div className="text-xs text-gray-400">Total</div>
              <div className="text-xl font-bold text-white">${((order.gems / 1000) * PRICING.gemsPer1000).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* XP Section */}
      <div className="bg-gray-800 p-6 rounded-2xl border-2 border-yellow-500 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fas fa-bolt text-9xl text-yellow-400"></i>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-yellow-400"><i className="fas fa-bolt mr-2"></i> XP Boost</h3>
            <span className="text-sm bg-yellow-900 text-yellow-300 px-3 py-1 rounded-full border border-yellow-500">
              ${PRICING.xpPer1000.toFixed(2)} / 1k
            </span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="1000"
            value={order.xp}
            onChange={(e) => handleChange('xp', parseInt(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 mb-4"
          />
          
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={order.xp}
              onChange={(e) => handleChange('xp', parseInt(e.target.value))}
              className="bg-gray-900 border border-gray-600 text-white text-lg rounded-xl focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3"
              placeholder="Amount"
            />
            <div className="text-right w-32">
              <div className="text-xs text-gray-400">Total</div>
              <div className="text-xl font-bold text-white">${((order.xp / 1000) * PRICING.xpPer1000).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Streaks Section */}
      <div className="bg-gray-800 p-6 rounded-2xl border-2 border-orange-500 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <i className="fas fa-fire text-9xl text-orange-400"></i>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-orange-400"><i className="fas fa-fire mr-2"></i> Streak Repair</h3>
            <span className="text-sm bg-orange-900 text-orange-300 px-3 py-1 rounded-full border border-orange-500">
              ${PRICING.streakPerUnit.toFixed(2)} / Day
            </span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="365" 
            step="1"
            value={order.streaks}
            onChange={(e) => handleChange('streaks', parseInt(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-4"
          />
          
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={order.streaks}
              onChange={(e) => handleChange('streaks', parseInt(e.target.value))}
              className="bg-gray-900 border border-gray-600 text-white text-lg rounded-xl focus:ring-orange-500 focus:border-orange-500 block w-full p-3"
              placeholder="Days"
            />
            <div className="text-right w-32">
              <div className="text-xs text-gray-400">Total</div>
              <div className="text-xl font-bold text-white">${(order.streaks * PRICING.streakPerUnit).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};