import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  Star, 
  Play,
  CheckCircle,
  ArrowRight,
  Dumbbell,
  Trophy,
  Clock
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Personal Trainer',
      description: 'Get personalized workout plans and real-time coaching powered by advanced AI.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Smart Goal Tracking',
      description: 'Set and achieve your fitness goals with intelligent progress monitoring.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Adaptive Workouts',
      description: 'Workouts that evolve with your progress and adapt to your schedule.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Connect with like-minded fitness enthusiasts and share your journey.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      content: 'FitAI completely transformed my workout routine. The AI coach feels like having a personal trainer available 24/7!'
    },
    {
      name: 'Mike Chen',
      role: 'Marathon Runner',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      content: 'The progress tracking and adaptive workouts helped me shave 15 minutes off my marathon time. Incredible!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Busy Professional',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      content: 'Finally, a fitness app that adapts to my crazy schedule. The AI knows exactly when I have time to work out.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '98%', label: 'Success Rate' },
    { value: '1M+', label: 'Workouts Completed' },
    { value: '4.9', label: 'App Rating' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-dark border-b border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 rounded-lg flex items-center justify-center font-bold">
                F
              </div>
              <span className="text-xl font-bold fitness-text-gradient">
                FitAI
              </span>
            </div>
            <Link
              to="/auth"
              className="fitness-button"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 hero-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Your AI-Powered
                <span className="block fitness-text-gradient">
                  Fitness Coach
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform your fitness journey with personalized AI coaching, smart workout planning, 
                and real-time progress tracking. Achieve your goals faster than ever before.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="group fitness-button flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <button className="group px-8 py-4 btn-secondary rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                  alt="Fitness Training"
                  className="rounded-2xl shadow-2xl w-full"
                />
                
                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -left-6 fitness-card p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-medium">Chest Day</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">4 exercises • 45 min</p>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-6 -right-6 fitness-card p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-medium">Goal Achieved!</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">7-day streak complete</p>
                </motion.div>
              </div>
              
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-2xl blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Powered by <span className="fitness-text-gradient">Artificial Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of fitness with our AI-driven platform that adapts to your unique needs and goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group fitness-card p-6 hover:border-primary-400/50 transition-all duration-300"
              >
                <div className="text-primary-400 mb-4 group-hover:text-primary-300 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Loved by <span className="fitness-text-gradient">Fitness Enthusiasts</span>
            </h2>
            <p className="text-xl text-gray-300">See what our community has to say about their transformation</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="fitness-card p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-900/20 to-primary-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="block fitness-text-gradient">Fitness Journey?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already achieved their fitness goals with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-primary-400">
                <CheckCircle className="w-5 h-5" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-400">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-400">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>

            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 fitness-button text-lg px-8 py-4"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-gradient border-t border-primary-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 rounded-lg flex items-center justify-center font-bold">
              F
            </div>
            <span className="text-xl font-bold fitness-text-gradient">
              FitAI
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Transform your fitness journey with AI-powered coaching and personalized workout plans.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 FitAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;