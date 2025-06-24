import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Apple, 
  Pill, 
  Crown, 
  Send,
  Sparkles,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';

const Recommendations: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm your AI fitness coach. How can I help you optimize your training today?",
      timestamp: new Date()
    }
  ]);

  const aiSuggestions = [
    {
      title: 'Increase Progressive Overload',
      description: 'Your bench press has plateaued. Try increasing weight by 2.5kg next session.',
      type: 'strength',
      priority: 'high',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: 'Focus on Recovery',
      description: 'Your HRV indicates high stress. Consider a deload week or active recovery.',
      type: 'recovery',
      priority: 'medium',
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'Cardio Optimization',
      description: 'Add 2 HIIT sessions per week to improve cardiovascular endurance.',
      type: 'cardio',
      priority: 'low',
      icon: <Target className="w-5 h-5" />
    }
  ];

  const nutritionRecommendations = [
    {
      title: 'Pre-Workout Nutrition',
      description: 'Consume 20-30g carbs 30-60 minutes before training',
      timing: 'Pre-workout'
    },
    {
      title: 'Post-Workout Recovery',
      description: '25g whey protein + 40g carbs within 30 minutes',
      timing: 'Post-workout'
    },
    {
      title: 'Daily Hydration',
      description: 'Aim for 35ml per kg body weight daily',
      timing: 'Throughout day'
    }
  ];

  const supplements = [
    { name: 'Creatine Monohydrate', dosage: '5g daily', timing: 'Anytime' },
    { name: 'Whey Protein', dosage: '25-30g', timing: 'Post-workout' },
    { name: 'Vitamin D3', dosage: '2000 IU', timing: 'With breakfast' },
    { name: 'Omega-3', dosage: '1-2g', timing: 'With meals' }
  ];

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: getAIResponse(chatMessage),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (message: string) => {
    const responses = [
      "Based on your current progress, I recommend focusing on compound movements to maximize strength gains.",
      "Your consistency has been excellent! Let's add some variety to prevent plateaus.",
      "I notice you've been training hard. Consider incorporating more rest days for optimal recovery.",
      "Great question! For your goals, I'd suggest increasing protein intake to 1.6g per kg body weight.",
      "Your form has improved significantly. Ready to increase the intensity?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AI Coach Recommendations
          </h1>
          <p className="text-gray-400 text-lg">
            Personalized insights and guidance powered by artificial intelligence
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Suggestions Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/60 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="w-6 h-6 text-primary-400" />
                <h2 className="text-xl font-bold text-white">AI Insights</h2>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>

              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-primary-400 mt-1">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{suggestion.title}</h3>
                        <p className="text-sm text-gray-300 mb-2">{suggestion.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            suggestion.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {suggestion.priority} priority
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded-full">
                            {suggestion.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pro Plan Upgrade */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-primary-900/50 to-neon-pink/20 rounded-lg border border-primary-500/30"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-white">Unlock More Insights</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Get unlimited AI recommendations, detailed analytics, and personalized meal plans.
                </p>
                <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-neon-pink rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105">
                  Upgrade to Pro
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* AI Chat Interface */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/60 rounded-xl border border-gray-700 h-[600px] flex flex-col"
            >
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6 text-electric-400" />
                  <h2 className="text-xl font-bold text-white">AI Coach Chat</h2>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {chatHistory.map((chat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm">{chat.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask your AI coach anything..."
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-gradient-to-r from-primary-600 to-electric-400 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Nutrition & Supplements */}
          <div className="space-y-6">
            {/* Nutrition Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/60 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Apple className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">Nutrition Plan</h2>
              </div>

              <div className="space-y-4">
                {nutritionRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{rec.title}</h3>
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                        {rec.timing}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{rec.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Supplement Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/60 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Pill className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Supplements</h2>
              </div>

              <div className="space-y-3">
                {supplements.map((supplement, index) => (
                  <motion.div
                    key={supplement.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-white">{supplement.name}</h4>
                      <p className="text-sm text-gray-400">{supplement.dosage}</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                      {supplement.timing}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <p className="text-sm text-blue-300">
                  💡 <strong>Tip:</strong> Always consult with a healthcare provider before starting new supplements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Understanding Your Body Type Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800/60 rounded-xl p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Understanding Your Body Type</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Learn about different body types to better understand your unique physique and optimize your fitness approach. 
              Our AI coach uses this information to provide more personalized recommendations.
            </p>
          </div>
          
          {/* Body Types Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Lean Body Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                  alt="Lean body type example"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lean</h3>
              <p className="text-gray-300 text-sm mb-4">
                Naturally slim build with low body fat and visible muscle definition. Fast metabolism makes weight challenging but muscle definition comes easier.
              </p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium">Physical Attributes:</h4>
                  <p className="text-gray-400">Narrow shoulders, low body fat (8-15%), visible abs, defined frame</p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium">Body Composition:</h4>
                  <p className="text-gray-400">Body fat: 8-15%, Muscle mass: Moderate to high, balanced distribution</p>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-medium">Fitness Focus:</h4>
                  <p className="text-gray-400">Strength training, progressive overload, adequate rest</p>
                </div>
                
                <div>
                  <h4 className="text-purple-400 font-medium">Nutrition:</h4>
                  <p className="text-gray-400">High calorie intake, frequent meals, focus on protein and complex carbs</p>
                </div>
              </div>
            </motion.div>

            {/* Average Body Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                  alt="Average body type example"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Average</h3>
              <p className="text-gray-300 text-sm mb-4">
                Balanced proportions with moderate muscle mass and body fat. Responds well to consistent training and adapts to various fitness goals effectively.
              </p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium">Physical Attributes:</h4>
                  <p className="text-gray-400">Proportional build, moderate muscle tone, balanced frame</p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium">Body Composition:</h4>
                  <p className="text-gray-400">Body fat: 12-20%, Muscle mass: Moderate, balanced distribution</p>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-medium">Fitness Focus:</h4>
                  <p className="text-gray-400">Balanced training, mix of cardio and strength, goal-specific approach</p>
                </div>
                
                <div>
                  <h4 className="text-purple-400 font-medium">Nutrition:</h4>
                  <p className="text-gray-400">Balanced macros, moderate calories, adjust based on goals</p>
                </div>
              </div>
            </motion.div>

            {/* Fit Body Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                  alt="Fit body type example"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fit</h3>
              <p className="text-gray-300 text-sm mb-4">
                Athletic build with good muscle development and low body fat. Regular training has resulted in visible fitness and strength gains.
              </p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium">Physical Attributes:</h4>
                  <p className="text-gray-400">Athletic shoulders, visible muscle definition, good posture</p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium">Body Composition:</h4>
                  <p className="text-gray-400">Body fat: 10-18%, Muscle mass: Above average, good tone</p>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-medium">Fitness Focus:</h4>
                  <p className="text-gray-400">Maintain fitness, progressive challenges, sport-specific training</p>
                </div>
                
                <div>
                  <h4 className="text-purple-400 font-medium">Nutrition:</h4>
                  <p className="text-gray-400">Performance nutrition, timing matters, adequate protein for recovery</p>
                </div>
              </div>
            </motion.div>

            {/* Muscular Body Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                  alt="Muscular body type example"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Muscular</h3>
              <p className="text-gray-300 text-sm mb-4">
                Well-developed muscle mass with broad shoulders and defined physique. Responds excellently to strength training and builds muscle efficiently.
              </p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium">Physical Attributes:</h4>
                  <p className="text-gray-400">Broad shoulders, large muscle groups, strong frame, defined arms</p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium">Body Composition:</h4>
                  <p className="text-gray-400">Body fat: 12-20%, Muscle mass: High, excellent definition</p>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-medium">Fitness Focus:</h4>
                  <p className="text-gray-400">Heavy compound lifts, power training, adequate recovery time</p>
                </div>
                
                <div>
                  <h4 className="text-purple-400 font-medium">Nutrition:</h4>
                  <p className="text-gray-400">High protein intake, calorie cycling, post-workout nutrition priority</p>
                </div>
              </div>
            </motion.div>

            {/* Larger Body Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                  alt="Larger body type example"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Larger Body</h3>
              <p className="text-gray-300 text-sm mb-4">
                Robust frame with higher body fat percentage but often substantial muscle underneath. Strong foundation for building both strength and endurance.
              </p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-blue-400 font-medium">Physical Attributes:</h4>
                  <p className="text-gray-400">Solid frame, broad build, strong base, natural power</p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium">Body Composition:</h4>
                  <p className="text-gray-400">Body fat: 20-35%+, Muscle mass: Often substantial under fat layer</p>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-medium">Fitness Focus:</h4>
                  <p className="text-gray-400">Cardio emphasis, strength training, gradual progression, joint care</p>
                </div>
                
                <div>
                  <h4 className="text-purple-400 font-medium">Nutrition:</h4>
                  <p className="text-gray-400">Caloric deficit, whole foods focus, portion control, meal timing</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-blue-500/10 rounded-lg p-6 border-l-4 border-blue-500 mb-6"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">Important Note</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Body types exist on a spectrum, and most people exhibit characteristics from multiple categories. These classifications are general 
                  guides to help you understand your body's tendencies and optimize your approach to fitness and nutrition. Your journey is unique, 
                  and what matters most is consistency, patience, and finding what works best for your individual needs and lifestyle. Every body type 
                  can achieve excellent health and fitness with the right approach.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Comparison Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-gray-700/30 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Comparison Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 text-gray-300 font-medium">Body Type</th>
                    <th className="text-left py-3 text-gray-300 font-medium">Primary Focus</th>
                    <th className="text-left py-3 text-gray-300 font-medium">Key Advantage</th>
                    <th className="text-left py-3 text-gray-300 font-medium">Main Challenge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="py-3 text-white font-medium">Lean</td>
                    <td className="py-3 text-gray-300">Muscle building</td>
                    <td className="py-3 text-green-400">Natural definition</td>
                    <td className="py-3 text-orange-400">Weight gain</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-white font-medium">Average</td>
                    <td className="py-3 text-gray-300">Balanced approach</td>
                    <td className="py-3 text-green-400">Adaptability</td>
                    <td className="py-3 text-orange-400">Maintaining motivation</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-white font-medium">Fit</td>
                    <td className="py-3 text-gray-300">Performance</td>
                    <td className="py-3 text-green-400">Training response</td>
                    <td className="py-3 text-orange-400">Avoiding plateaus</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-white font-medium">Muscular</td>
                    <td className="py-3 text-gray-300">Strength gains</td>
                    <td className="py-3 text-green-400">Muscle development</td>
                    <td className="py-3 text-orange-400">Cutting body fat</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-white font-medium">Larger Body</td>
                    <td className="py-3 text-gray-300">Fat loss</td>
                    <td className="py-3 text-green-400">Natural strength</td>
                    <td className="py-3 text-orange-400">Initial conditioning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;