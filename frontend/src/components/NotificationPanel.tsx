import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Droplets, Clock, Heart, Trophy } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

interface SmartNotification {
  id: string;
  type: 'hydration' | 'workout' | 'recovery' | 'achievement';
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);

  useEffect(() => {
    // Simulate smart notifications
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'hydration',
        title: 'Hydration Reminder',
        message: 'Time to drink some water! Stay hydrated for optimal performance.',
        time: '2 minutes ago',
        icon: <Droplets className="w-5 h-5 text-blue-400" />
      },
      {
        id: '2',
        type: 'workout',
        title: 'Pre-Workout Alert',
        message: 'Your Push Day workout starts in 30 minutes. Get ready!',
        time: '15 minutes ago',
        icon: <Clock className="w-5 h-5 text-orange-400" />
      },
      {
        id: '3',
        type: 'recovery',
        title: 'Recovery Time',
        message: 'Great job on yesterday\'s workout! Focus on rest and protein today.',
        time: '1 hour ago',
        icon: <Heart className="w-5 h-5 text-red-400" />
      },
      {
        id: '4',
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'Congratulations! You\'ve completed 7 days in a row. Keep it up!',
        time: '2 hours ago',
        icon: <Trophy className="w-5 h-5 text-yellow-400" />
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case 'hydration': return 'border-l-blue-400';
      case 'workout': return 'border-l-orange-400';
      case 'recovery': return 'border-l-red-400';
      case 'achievement': return 'border-l-yellow-400';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-16 right-4 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50"
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Smart Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border-l-4 ${getNotificationBorder(notification.type)} hover:bg-gray-700/50 transition-colors duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {notification.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200">
          Customize notification preferences
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;