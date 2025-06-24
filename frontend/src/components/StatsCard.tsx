import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, change }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-gray-800/60 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden group"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 bg-gradient-to-br ${color} bg-opacity-20 rounded-lg`}>
            {icon}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{value}</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
          <p className="text-xs text-gray-500">{change}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;