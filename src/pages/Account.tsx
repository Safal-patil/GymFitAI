import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save,
  Edit3,
  Crown,
  Calendar,
  Target,
  Activity,
  Settings,
  Bell,
  Shield,
  BarChart3,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Account: React.FC = () => {
  const { user } = useAuth();
  const { userStats } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock user data for demo
  const mockUser = {
    id: '1',
    _id: '1',
    email: 'demo@fitai.com',
    workoutPhotos: [],
    profile: {
      name: 'Demo User',
      gender: 'male' as const,
      age: 28,
      bodytype: 'Athletic',
      weightKg: 75,
      heightCm: 180,
      bodyfat: 12,
      experienceLevel: 'intermediate' as const,
      currentStreak: 7,
      workoutsCompleted: 45,
      totalWorkouts: 50
    },
    strengthInfo: {
      maxPushups: 50,
      maxPullups: 15,
      maxSquats: 100,
      maxBenchKg: 80,
      maxSquatkg: 120,
      maxDeadliftkg: 140
    },
    premiumExpiry: new Date('2025-12-31'),
    tier: 'premium' as const,
    preferences: {
      goal: 'Build Muscle',
      daysPerWeek: 5,
      planStyle: 'Push-Pull-Legs',
      sessionDuration: 60,
      equipment: 'Full Gym',
      limitations: 'None',
      availableTime: 'Evening'
    }
  };

  const currentUser = user || mockUser;
  const hasSubscription = currentUser.tier === 'premium';

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <Crown className="w-5 h-5" /> }
  ];

  const stats = [
    {
      label: 'Current Streak',
      value: `${currentUser.profile.currentStreak} days`,
      icon: <Activity className="w-5 h-5 text-orange-400" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      label: 'Workouts Completed',
      value: currentUser.profile.workoutsCompleted,
      icon: <Target className="w-5 h-5 text-green-400" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Success Rate',
      value: `${Math.round((currentUser.profile.workoutsCompleted / currentUser.profile.totalWorkouts) * 100)}%`,
      icon: <Crown className="w-5 h-5 text-yellow-400" />,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const renderAnalyticsContent = () => {
    if (!hasSubscription) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-8 border border-yellow-500/30 text-center"
        >
          {/* Premium Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Crown className="w-8 h-8 text-white" />
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-3">
            Upgrade to Pro
          </h3>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-yellow-400">Analytics</span> is a premium feature
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Get detailed insights into your workout performance, progress tracking, and advanced analytics.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/pricing')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
          >
            Upgrade to Pro
          </motion.button>

          {/* Pricing Hint */}
          <p className="text-xs text-gray-500 mt-4">
            Starting at $9.99/month • 7-day free trial
          </p>
        </motion.div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-600 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strength Records */}
        <div className="bg-gray-700/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Strength Records</h4>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-electric-400 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>Future Analytics</span>
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Max Push-ups</div>
              <div className="text-2xl font-bold text-white">{currentUser.strengthInfo.maxPushups}</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Max Pull-ups</div>
              <div className="text-2xl font-bold text-white">{currentUser.strengthInfo.maxPullups}</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Max Squats</div>
              <div className="text-2xl font-bold text-white">{currentUser.strengthInfo.maxSquats}</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Bench Press (kg)</div>
              <div className="text-2xl font-bold text-white">{currentUser.strengthInfo.maxBenchKg}</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Squat (kg)</div>
              <div className="text-2xl font-bold text-white">{currentUser.strengthInfo.maxSquatkg}</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Deadlift (kg)</div>
              <div className="text-2xl font-bold text-white">{currentUser.strengthInfo.maxDeadliftkg}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Personal Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={currentUser.profile.name}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                    <input
                      type="number"
                      value={currentUser.profile.age}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={currentUser.profile.weightKg}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={currentUser.profile.heightCm}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-neon-pink rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Fitness Preferences */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Fitness Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Primary Goal</label>
                  <input
                    type="text"
                    value={currentUser.preferences.goal}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Days per Week</label>
                    <input
                      type="number"
                      value={currentUser.preferences.daysPerWeek}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Session Duration (min)</label>
                    <input
                      type="number"
                      value={currentUser.preferences.sessionDuration}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return renderAnalyticsContent();

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Account Security */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Account Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors duration-200">
                  Update Password
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Workout Reminders</h4>
                    <p className="text-gray-400 text-sm">Get notified about upcoming workouts</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Progress Updates</h4>
                    <p className="text-gray-400 text-sm">Weekly progress summaries</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Subscription Status */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Subscription Status</h3>
              <div className="flex items-center space-x-4 mb-4">
                <Crown className="w-8 h-8 text-yellow-400" />
                <div>
                  <h4 className="text-lg font-semibold text-white capitalize">{currentUser.tier} Plan</h4>
                  <p className="text-gray-400">
                    {hasSubscription ? 'Active until December 31, 2025' : 'Free plan with limited features'}
                  </p>
                </div>
              </div>
              {!hasSubscription && (
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-neon-pink rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Upgrade to Pro
                </button>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>
              <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="text-white">•••• •••• •••• 4242</p>
                  <p className="text-gray-400 text-sm">Expires 12/27</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your profile and preferences
          </p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-neon-pink rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {currentUser.profile.name?.charAt(0) || 'U'}
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-primary-600 rounded-full hover:bg-primary-700 transition-colors duration-200">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{currentUser.profile.name}</h2>
              <p className="text-gray-400">{currentUser.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400 capitalize">{currentUser.tier} Member</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800/60 rounded-xl p-1 mb-8 border border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Account;