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
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Account: React.FC = () => {
  const { user } = useAuth();
  const { userStats } = useUser();
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

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
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
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Stats */}
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
        </motion.div>

        {/* Profile Information */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/60 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Personal Information</h3>
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Body Fat %</label>
                  <input
                    type="number"
                    value={currentUser.profile.bodyfat}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Experience Level</label>
                  <select
                    value={currentUser.profile.experienceLevel}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fitness Preferences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/60 rounded-xl p-6 border border-gray-700"
          >
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

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Workout Style</label>
                <input
                  type="text"
                  value={currentUser.preferences.planStyle}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Limitations</label>
                <textarea
                  value={currentUser.preferences.limitations}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strength Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 mt-8"
        >
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
        </motion.div>

        {/* Save Button */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-end"
          >
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Account;