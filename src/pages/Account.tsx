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
  CreditCard,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Account: React.FC = () => {
  const { user } = useAuth();
  const { userStats } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Profile Header Card */}
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

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/60 rounded-xl border border-gray-700 mb-8"
        >
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary-400 border-b-2 border-primary-400 bg-primary-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-6 h-6 text-primary-400" />
                    <h3 className="text-xl font-bold text-white">Personal Information</h3>
                  </div>
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
                <div className="flex items-center space-x-2 mb-6">
                  <Target className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Fitness Preferences</h3>
                </div>

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

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Available Equipment</label>
                    <input
                      type="text"
                      value={currentUser.preferences.equipment}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              {hasSubscription ? (
                <div className="space-y-8">
                  {/* Stats Overview */}
                  <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-6">
                      <BarChart3 className="w-6 h-6 text-primary-400" />
                      <h3 className="text-xl font-bold text-white">Workout Statistics</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
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
                  </div>

                  {/* Strength Records */}
                  <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-6">
                      <Activity className="w-6 h-6 text-orange-400" />
                      <h3 className="text-xl font-bold text-white">Strength Records</h3>
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
              ) : (
                <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Upgrade to Pro</h3>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-yellow-400">Advanced Analytics</span> is a premium feature
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    Access detailed fitness analytics, strength records, and comprehensive progress tracking.
                  </p>
                  <button
                    onClick={() => window.location.href = '/pricing'}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Account Settings</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-400" />
                    <div>
                      <h4 className="font-medium text-white">Push Notifications</h4>
                      <p className="text-sm text-gray-400">Receive workout reminders and updates</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors duration-200">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-red-400" />
                    <div>
                      <h4 className="font-medium text-white">Change Password</h4>
                      <p className="text-sm text-gray-400">Update your account password</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-medium transition-colors duration-200">
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Billing & Subscription</h3>
              </div>
              
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="p-4 bg-gradient-to-r from-primary-500/10 to-neon-pink/10 border border-primary-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Crown className="w-6 h-6 text-yellow-400" />
                      <div>
                        <h4 className="font-semibold text-white capitalize">{currentUser.tier} Plan</h4>
                        <p className="text-sm text-gray-400">
                          {hasSubscription ? 'Active until December 31, 2025' : 'Free plan with limited features'}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors duration-200">
                      {hasSubscription ? 'Manage' : 'Upgrade'}
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Payment Method</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-400">Expires 12/26</p>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <h4 className="font-medium text-white mb-3">Recent Transactions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-white">Pro Plan - Monthly</p>
                        <p className="text-sm text-gray-400">Jan 15, 2025</p>
                      </div>
                      <span className="text-green-400 font-medium">$19.99</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-white">Pro Plan - Monthly</p>
                        <p className="text-sm text-gray-400">Dec 15, 2024</p>
                      </div>
                      <span className="text-green-400 font-medium">$19.99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Account;