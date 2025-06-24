import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, User, Target, Activity, Brain, Clock, Dumbbell, Heart, Calendar, RotateCcw, Sparkles, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/UserContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useAutoFill } from '../contexts/AutoFillContext';
import { getTodayString, getDateString } from '../utils/dateUtils';

interface WorkoutPlanCreatorProps {
  onClose: () => void;
}

interface PlanForm {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  bodyFat?: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  daysPerWeek: number;
  sessionDuration: number;
  equipment: string;
  workoutStyle: string;
  limitations: string;
  availableTime: string;
}

const WorkoutPlanCreator: React.FC<WorkoutPlanCreatorProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAutoFillNotification, setShowAutoFillNotification] = useState(false);
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<PlanForm>();
  const { updateUserStats, addWorkout, clearUserData } = useUser();
  const { addNotification } = useNotifications();
  const { autoFillData, saveAutoFillData, clearAutoFillData, hasAutoFillData, getFieldValue, isFieldAutoFilled } = useAutoFill();

  const steps = [
    { title: 'Personal Info', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, shortTitle: 'Personal' },
    { title: 'Body Metrics', icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5" />, shortTitle: 'Metrics' },
    { title: 'Goals & Preferences', icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, shortTitle: 'Goals' },
    { title: 'Equipment & Style', icon: <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />, shortTitle: 'Equipment' },
    { title: 'AI Generation', icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />, shortTitle: 'Generate' }
  ];

  const goals = [
    'Weight Loss & Fat Burn',
    'Muscle Building & Strength',
    'Athletic Performance',
    'General Fitness & Health',
    'Flexibility & Mobility',
    'Endurance & Cardio',
    'Body Recomposition',
    'Functional Fitness'
  ];

  const equipmentOptions = [
    'Full Gym Access',
    'Home Gym (Weights & Machines)',
    'Minimal Equipment (Dumbbells, Resistance Bands)',
    'Bodyweight Only',
    'Outdoor/Park Equipment',
    'Hotel/Travel Setup'
  ];

  const workoutStyles = [
    'High-Intensity Interval Training (HIIT)',
    'Traditional Strength Training',
    'Circuit Training',
    'Powerlifting',
    'Bodybuilding',
    'Functional Training',
    'Yoga & Flexibility',
    'Mixed Training'
  ];

  const timeSlots = [
    'Early Morning (5-7 AM)',
    'Morning (7-9 AM)',
    'Mid-Morning (9-11 AM)',
    'Lunch Time (11 AM-1 PM)',
    'Afternoon (1-4 PM)',
    'Evening (4-7 PM)',
    'Night (7-9 PM)',
    'Flexible/Varies'
  ];

  // Auto-fill form fields on component mount
  useEffect(() => {
    if (hasAutoFillData && autoFillData) {
      const fieldsToFill: (keyof PlanForm)[] = [
        'name', 'age', 'gender', 'height', 'weight', 'bodyFat', 'fitnessLevel',
        'goal', 'daysPerWeek', 'sessionDuration', 'equipment', 'workoutStyle',
        'limitations', 'availableTime'
      ];

      fieldsToFill.forEach(field => {
        const value = getFieldValue(field);
        if (value !== undefined) {
          setValue(field, value);
        }
      });

      setShowAutoFillNotification(true);
      setTimeout(() => setShowAutoFillNotification(false), 5000);
    }
  }, [hasAutoFillData, autoFillData, setValue, getFieldValue]);

  const generateComprehensiveWorkoutPlan = async (data: PlanForm) => {
    setIsGenerating(true);
    
    // Save current form data for future auto-fill
    saveAutoFillData(data);
    
    // Simulate AI generation with realistic timing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Clear existing user data before creating new plan
    clearUserData();
    
    // Update user stats
    updateUserStats({
      age: data.age,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      bodyFat: data.bodyFat,
      goal: data.goal,
      fitnessLevel: data.fitnessLevel,
      workoutsCompleted: 0,
      currentStreak: 0,
      totalWorkouts: 0
    });

    // Generate comprehensive workouts based on all user inputs
    const workoutPlan = generateDetailedWorkouts(data);
    
    // Add today's workout first
    if (workoutPlan.todaysWorkout) {
      addWorkout(workoutPlan.todaysWorkout);
    }
    
    // Add weekly schedule
    workoutPlan.weeklySchedule.forEach(workout => addWorkout(workout));
    
    setIsGenerating(false);
    
    addNotification({
      type: 'success',
      title: 'Personalized Workout Plan Created! 🎉',
      message: `Your comprehensive ${data.daysPerWeek}-day workout plan with ${workoutPlan.totalExercises} exercises is ready!`
    });
    
    onClose();
  };

  const generateDetailedWorkouts = (data: PlanForm) => {
    const workouts = [];
    let totalExercises = 0;
    
    // Generate today's specific workout
    const todaysWorkout = generateTodaysWorkout(data);
    totalExercises += todaysWorkout.exercises.length;
    
    // Generate weekly schedule based on user preferences
    const weeklySchedule = generateWeeklySchedule(data);
    weeklySchedule.forEach(workout => {
      totalExercises += workout.exercises.length;
    });
    
    return {
      todaysWorkout,
      weeklySchedule,
      totalExercises
    };
  };

  const generateTodaysWorkout = (data: PlanForm) => {
    const exercises = [];
    let exerciseId = 1;
    
    // Generate exercises based on goals and fitness level
    if (data.goal.includes('Strength') || data.goal.includes('Muscle')) {
      // Strength-focused workout
      exercises.push(
        {
          id: exerciseId++,
          name: 'Warm-up: Dynamic Stretching',
          sets: 1,
          reps: 1,
          duration: 10,
          restPeriod: 0,
          instructions: 'Full body dynamic warm-up focusing on mobility',
          completed: false,
          type: 'flexibility' as const
        },
        {
          id: exerciseId++,
          name: data.equipment.includes('Bodyweight') ? 'Push-ups' : 'Bench Press',
          sets: data.fitnessLevel === 'beginner' ? 3 : data.fitnessLevel === 'intermediate' ? 4 : 5,
          reps: data.fitnessLevel === 'beginner' ? 8 : data.fitnessLevel === 'intermediate' ? 10 : 12,
          weight: data.equipment.includes('Bodyweight') ? undefined : (data.fitnessLevel === 'beginner' ? 60 : data.fitnessLevel === 'intermediate' ? 80 : 100),
          restPeriod: data.fitnessLevel === 'beginner' ? 90 : data.fitnessLevel === 'intermediate' ? 120 : 180,
          instructions: 'Focus on controlled movement and proper form',
          completed: false,
          type: 'strength' as const
        },
        {
          id: exerciseId++,
          name: data.equipment.includes('Bodyweight') ? 'Bodyweight Squats' : 'Barbell Squats',
          sets: data.fitnessLevel === 'beginner' ? 3 : 4,
          reps: data.fitnessLevel === 'beginner' ? 10 : data.fitnessLevel === 'intermediate' ? 12 : 15,
          weight: data.equipment.includes('Bodyweight') ? undefined : (data.fitnessLevel === 'beginner' ? 70 : data.fitnessLevel === 'intermediate' ? 90 : 120),
          restPeriod: data.fitnessLevel === 'beginner' ? 90 : 120,
          instructions: 'Keep chest up, knees tracking over toes',
          completed: false,
          type: 'strength' as const
        }
      );
    }
    
    if (data.goal.includes('Cardio') || data.goal.includes('Weight Loss')) {
      // Cardio-focused exercises
      exercises.push(
        {
          id: exerciseId++,
          name: 'High Knees',
          sets: 3,
          reps: 30,
          duration: 30,
          restPeriod: 30,
          instructions: 'Drive knees up to waist level, maintain quick pace',
          completed: false,
          type: 'cardio' as const
        },
        {
          id: exerciseId++,
          name: 'Burpees',
          sets: data.fitnessLevel === 'beginner' ? 3 : 4,
          reps: data.fitnessLevel === 'beginner' ? 5 : data.fitnessLevel === 'intermediate' ? 8 : 12,
          restPeriod: 60,
          instructions: 'Full body movement: squat, plank, jump',
          completed: false,
          type: 'cardio' as const
        }
      );
    }
    
    if (data.workoutStyle.includes('HIIT')) {
      exercises.push({
        id: exerciseId++,
        name: 'Mountain Climbers',
        sets: 4,
        reps: 20,
        duration: 30,
        restPeriod: 30,
        instructions: '30 seconds max effort, 30 seconds rest',
        completed: false,
        type: 'cardio' as const
      });
    }
    
    // Cool down
    exercises.push({
      id: exerciseId++,
      name: 'Cool Down Stretching',
      sets: 1,
      reps: 1,
      duration: 10,
      restPeriod: 0,
      instructions: 'Static stretches for major muscle groups',
      completed: false,
      type: 'flexibility' as const
    });
    
    return {
      name: `Today's ${data.goal.split(' ')[0]} Focus`,
      date: getTodayString(),
      exercises,
      completed: false,
      estimatedDuration: data.sessionDuration,
      difficulty: data.fitnessLevel,
      workoutType: data.workoutStyle
    };
  };

  const generateWeeklySchedule = (data: PlanForm) => {
    const weeklyWorkouts = [];
    const daysPerWeek = parseInt(data.daysPerWeek.toString());
    
    const workoutTypes = [
      { name: 'Upper Body Strength', focus: 'strength', targetMuscles: ['chest', 'shoulders', 'arms'] },
      { name: 'Lower Body Power', focus: 'strength', targetMuscles: ['legs', 'glutes'] },
      { name: 'Cardio Blast', focus: 'cardio', targetMuscles: ['full-body'] },
      { name: 'Core & Stability', focus: 'functional', targetMuscles: ['core', 'stabilizers'] },
      { name: 'Full Body Circuit', focus: 'mixed', targetMuscles: ['full-body'] },
      { name: 'Active Recovery', focus: 'flexibility', targetMuscles: ['full-body'] },
      { name: 'HIIT Training', focus: 'cardio', targetMuscles: ['full-body'] }
    ];
    
    for (let day = 1; day <= daysPerWeek; day++) {
      const workoutType = workoutTypes[(day - 1) % workoutTypes.length];
      const exercises = generateExercisesForWorkoutType(workoutType, data, day);
      
      weeklyWorkouts.push({
        name: workoutType.name,
        date: getDateString(day),
        exercises,
        completed: false,
        estimatedDuration: data.sessionDuration,
        difficulty: data.fitnessLevel,
        workoutType: workoutType.focus,
        targetMuscles: workoutType.targetMuscles
      });
    }
    
    return weeklyWorkouts;
  };

  const generateExercisesForWorkoutType = (workoutType: any, data: PlanForm, dayNumber: number) => {
    const exercises = [];
    let exerciseId = dayNumber * 100; // Unique ID base for each day
    
    // Always start with warm-up
    exercises.push({
      id: exerciseId++,
      name: 'Dynamic Warm-up',
      sets: 1,
      reps: 1,
      duration: 5,
      restPeriod: 0,
      instructions: 'Prepare your body for the workout',
      completed: false,
      type: 'flexibility' as const
    });
    
    // Generate specific exercises based on workout type
    switch (workoutType.focus) {
      case 'strength':
        if (workoutType.name.includes('Upper')) {
          exercises.push(
            {
              id: exerciseId++,
              name: data.equipment.includes('Bodyweight') ? 'Push-ups' : 'Bench Press',
              sets: data.fitnessLevel === 'beginner' ? 3 : 4,
              reps: data.fitnessLevel === 'beginner' ? 8 : 10,
              weight: data.equipment.includes('Bodyweight') ? undefined : (data.fitnessLevel === 'beginner' ? 60 : 80),
              restPeriod: 120,
              instructions: 'Control the weight, focus on form',
              completed: false,
              type: 'strength' as const
            },
            {
              id: exerciseId++,
              name: data.equipment.includes('Bodyweight') ? 'Pike Push-ups' : 'Shoulder Press',
              sets: 3,
              reps: data.fitnessLevel === 'beginner' ? 6 : 10,
              weight: data.equipment.includes('Bodyweight') ? undefined : (data.fitnessLevel === 'beginner' ? 30 : 40),
              restPeriod: 90,
              instructions: 'Engage core, maintain stability',
              completed: false,
              type: 'strength' as const
            }
          );
        } else {
          exercises.push(
            {
              id: exerciseId++,
              name: data.equipment.includes('Bodyweight') ? 'Bodyweight Squats' : 'Barbell Squats',
              sets: data.fitnessLevel === 'beginner' ? 3 : 4,
              reps: data.fitnessLevel === 'beginner' ? 10 : 12,
              weight: data.equipment.includes('Bodyweight') ? undefined : (data.fitnessLevel === 'beginner' ? 70 : 100),
              restPeriod: 120,
              instructions: 'Deep squat, chest up',
              completed: false,
              type: 'strength' as const
            },
            {
              id: exerciseId++,
              name: 'Romanian Deadlifts',
              sets: 3,
              reps: data.fitnessLevel === 'beginner' ? 8 : 10,
              weight: data.fitnessLevel === 'beginner' ? 40 : 60,
              restPeriod: 120,
              instructions: 'Hinge at hips, keep bar close',
              completed: false,
              type: 'strength' as const
            }
          );
        }
        break;
        
      case 'cardio':
        exercises.push(
          {
            id: exerciseId++,
            name: 'Jump Rope',
            sets: 5,
            reps: 1,
            duration: 30,
            restPeriod: 30,
            instructions: '30 seconds on, 30 seconds rest',
            completed: false,
            type: 'cardio' as const
          },
          {
            id: exerciseId++,
            name: 'High Intensity Intervals',
            sets: 8,
            reps: 1,
            duration: 20,
            restPeriod: 40,
            instructions: '20 seconds max effort, 40 seconds rest',
            completed: false,
            type: 'cardio' as const
          }
        );
        break;
        
      case 'functional':
        exercises.push(
          {
            id: exerciseId++,
            name: 'Plank',
            sets: 3,
            reps: 1,
            duration: data.fitnessLevel === 'beginner' ? 30 : data.fitnessLevel === 'intermediate' ? 45 : 60,
            restPeriod: 60,
            instructions: 'Maintain straight line from head to heels',
            completed: false,
            type: 'strength' as const
          },
          {
            id: exerciseId++,
            name: 'Single-leg Deadlifts',
            sets: 3,
            reps: data.fitnessLevel === 'beginner' ? 6 : 8,
            restPeriod: 60,
            instructions: 'Balance and control, engage core',
            completed: false,
            type: 'strength' as const
          }
        );
        break;
        
      default:
        // Mixed workout
        exercises.push(
          {
            id: exerciseId++,
            name: 'Burpees',
            sets: 3,
            reps: data.fitnessLevel === 'beginner' ? 5 : 8,
            restPeriod: 60,
            instructions: 'Full body explosive movement',
            completed: false,
            type: 'cardio' as const
          },
          {
            id: exerciseId++,
            name: 'Bodyweight Squats',
            sets: 3,
            reps: data.fitnessLevel === 'beginner' ? 12 : 15,
            restPeriod: 45,
            instructions: 'Controlled movement, full range',
            completed: false,
            type: 'strength' as const
          }
        );
    }
    
    // Always end with cool down
    exercises.push({
      id: exerciseId++,
      name: 'Cool Down & Stretch',
      sets: 1,
      reps: 1,
      duration: 10,
      restPeriod: 0,
      instructions: 'Static stretches for worked muscles',
      completed: false,
      type: 'flexibility' as const
    });
    
    return exercises;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: PlanForm) => {
    if (currentStep === steps.length - 1) {
      generateComprehensiveWorkoutPlan(data);
    } else {
      nextStep();
    }
  };

  const handleClearAutoFill = () => {
    clearAutoFillData();
    reset();
    addNotification({
      type: 'info',
      title: 'Auto-fill Data Cleared',
      message: 'All previously saved form data has been cleared. You can now start fresh.'
    });
  };

  const AutoFillIndicator: React.FC<{ fieldName: keyof PlanForm }> = ({ fieldName }) => {
    if (!isFieldAutoFilled(fieldName)) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center space-x-1 ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
      >
        <Sparkles className="w-3 h-3" />
        <span>Auto-filled</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center workout-form-modal"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="workout-form-container bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
      >
        {/* Auto-fill Notification */}
        <AnimatePresence>
          {showAutoFillNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Form auto-filled with your previous data</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="workout-form-header">
          <div className="flex items-center justify-between mb-4">
            <h2 className="workout-form-title">
              AI Workout Plan Generator
            </h2>
            <div className="flex items-center space-x-2">
              {hasAutoFillData && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAutoFill}
                  className="hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm"
                  title="Clear auto-fill data"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear Auto-fill</span>
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="workout-form-close-btn"
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
          </div>
          
          {/* Auto-fill Status */}
          {hasAutoFillData && (
            <div className="workout-form-autofill-status">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">
                    Smart Auto-fill Active
                  </span>
                </div>
                <span className="text-blue-400 text-xs">
                  Form fields populated from your previous plan
                  {autoFillData?.planCount && ` (Plan #${autoFillData.planCount})`}
                </span>
              </div>
            </div>
          )}
          
          {/* Progress Steps */}
          <div className="workout-form-steps">
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <div
                  className={`workout-form-step ${
                    index === currentStep ? 'workout-form-step-active' : 
                    index < currentStep ? 'workout-form-step-completed' : 'workout-form-step-inactive'
                  }`}
                >
                  <div className="workout-form-step-icon">
                    {step.icon}
                  </div>
                  <span className="workout-form-step-text">{step.title}</span>
                  <span className="workout-form-step-text-mobile">{step.shortTitle}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 ml-1 sm:ml-2 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="workout-form-content">
          <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
            <div className="workout-form-scroll-area flex-1">
              <div className="workout-form-main">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="workout-form-step-content"
                  >
                    <div>
                      <h3 className="workout-form-section-title">Personal Information</h3>
                      
                      <div className="workout-form-grid-2">
                        <div className="workout-form-field-wrapper">
                          <label className="workout-form-label">
                            Full Name *
                            <AutoFillIndicator fieldName="name" />
                          </label>
                          <input
                            {...register('name', { required: 'Name is required' })}
                            className="workout-form-input"
                            placeholder="Enter your full name"
                          />
                          {errors.name && (
                            <p className="workout-form-error">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="workout-form-field-wrapper">
                          <label className="workout-form-label">
                            Age *
                            <AutoFillIndicator fieldName="age" />
                          </label>
                          <input
                            {...register('age', { 
                              required: 'Age is required',
                              min: { value: 13, message: 'Must be at least 13 years old' },
                              max: { value: 100, message: 'Must be under 100 years old' }
                            })}
                            type="number"
                            className="workout-form-input"
                            placeholder="25"
                          />
                          {errors.age && (
                            <p className="workout-form-error">{errors.age.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Gender *
                          <AutoFillIndicator fieldName="gender" />
                        </label>
                        <div className="workout-form-radio-grid">
                          {['male', 'female', 'other'].map((gender) => (
                            <label key={gender} className="workout-form-radio-wrapper">
                              <input
                                {...register('gender', { required: 'Please select your gender' })}
                                type="radio"
                                value={gender}
                                className="sr-only peer"
                              />
                              <div className="workout-form-radio-card">
                                <span className="text-white capitalize">{gender}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.gender && (
                          <p className="workout-form-error">{errors.gender.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Body Metrics */}
                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="workout-form-step-content"
                  >
                    <div>
                      <h3 className="workout-form-section-title">Body Metrics</h3>
                      
                      <div className="workout-form-grid-2">
                        <div className="workout-form-field-wrapper">
                          <label className="workout-form-label">
                            Height (cm) *
                            <AutoFillIndicator fieldName="height" />
                          </label>
                          <input
                            {...register('height', { 
                              required: 'Height is required',
                              min: { value: 100, message: 'Height must be at least 100cm' },
                              max: { value: 250, message: 'Height must be under 250cm' }
                            })}
                            type="number"
                            className="workout-form-input"
                            placeholder="175"
                          />
                          {errors.height && (
                            <p className="workout-form-error">{errors.height.message}</p>
                          )}
                        </div>

                        <div className="workout-form-field-wrapper">
                          <label className="workout-form-label">
                            Weight (kg) *
                            <AutoFillIndicator fieldName="weight" />
                          </label>
                          <input
                            {...register('weight', { 
                              required: 'Weight is required',
                              min: { value: 30, message: 'Weight must be at least 30kg' },
                              max: { value: 300, message: 'Weight must be under 300kg' }
                            })}
                            type="number"
                            className="workout-form-input"
                            placeholder="70"
                          />
                          {errors.weight && (
                            <p className="workout-form-error">{errors.weight.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Body Fat % (Optional)
                          <AutoFillIndicator fieldName="bodyFat" />
                        </label>
                        <input
                          {...register('bodyFat', { 
                            min: { value: 3, message: 'Body fat must be at least 3%' },
                            max: { value: 50, message: 'Body fat must be under 50%' }
                          })}
                          type="number"
                          className="workout-form-input"
                          placeholder="15"
                        />
                        <p className="workout-form-helper-text">
                          If you don't know your body fat percentage, you can leave this blank
                        </p>
                        {errors.bodyFat && (
                          <p className="workout-form-error">{errors.bodyFat.message}</p>
                        )}
                      </div>

                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Fitness Level *
                          <AutoFillIndicator fieldName="fitnessLevel" />
                        </label>
                        <div className="workout-form-radio-grid">
                          {[
                            { value: 'beginner', label: 'Beginner', desc: 'New to fitness' },
                            { value: 'intermediate', label: 'Intermediate', desc: '6+ months' },
                            { value: 'advanced', label: 'Advanced', desc: '2+ years' }
                          ].map((level) => (
                            <label key={level.value} className="workout-form-radio-wrapper">
                              <input
                                {...register('fitnessLevel', { required: 'Please select your fitness level' })}
                                type="radio"
                                value={level.value}
                                className="sr-only peer"
                              />
                              <div className="workout-form-radio-card">
                                <div className="text-white font-medium text-sm">{level.label}</div>
                                <div className="text-gray-400 text-xs mt-1 hidden sm:block">{level.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.fitnessLevel && (
                          <p className="workout-form-error">{errors.fitnessLevel.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Goals & Preferences */}
                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="workout-form-step-content"
                  >
                    <div>
                      <h3 className="workout-form-section-title">Goals & Preferences</h3>
                      
                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Primary Fitness Goal *
                          <AutoFillIndicator fieldName="goal" />
                        </label>
                        <div className="workout-form-option-grid">
                          {goals.map((goal) => (
                            <label key={goal} className="workout-form-option-wrapper">
                              <input
                                {...register('goal', { required: 'Please select your primary goal' })}
                                type="radio"
                                value={goal}
                                className="sr-only peer"
                              />
                              <div className="workout-form-option-card">
                                <span className="text-white text-sm">{goal}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.goal && (
                          <p className="workout-form-error">{errors.goal.message}</p>
                        )}
                      </div>

                      <div className="workout-form-grid-2">
                        <div className="workout-form-field-wrapper">
                          <label className="workout-form-label">
                            Days per Week *
                            <AutoFillIndicator fieldName="daysPerWeek" />
                          </label>
                          <select
                            {...register('daysPerWeek', { required: 'Please select workout frequency' })}
                            className="workout-form-select"
                          >
                            <option value="">Select frequency</option>
                            <option value="3">3 days (Beginner friendly)</option>
                            <option value="4">4 days (Balanced approach)</option>
                            <option value="5">5 days (Intermediate/Advanced)</option>
                            <option value="6">6 days (Advanced athletes)</option>
                            <option value="7">7 days (Elite level)</option>
                          </select>
                          {errors.daysPerWeek && (
                            <p className="workout-form-error">{errors.daysPerWeek.message}</p>
                          )}
                        </div>

                        <div className="workout-form-field-wrapper">
                          <label className="workout-form-label">
                            Session Duration *
                            <AutoFillIndicator fieldName="sessionDuration" />
                          </label>
                          <select
                            {...register('sessionDuration', { required: 'Please select session duration' })}
                            className="workout-form-select"
                          >
                            <option value="">Select duration</option>
                            <option value="30">30 minutes (Quick sessions)</option>
                            <option value="45">45 minutes (Standard)</option>
                            <option value="60">60 minutes (Comprehensive)</option>
                            <option value="75">75 minutes (Intensive)</option>
                            <option value="90">90 minutes (Extended)</option>
                          </select>
                          {errors.sessionDuration && (
                            <p className="workout-form-error">{errors.sessionDuration.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Available Time Slots
                          <AutoFillIndicator fieldName="availableTime" />
                        </label>
                        <select
                          {...register('availableTime')}
                          className="workout-form-select"
                        >
                          <option value="">Select preferred time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Equipment & Style */}
                {currentStep === 3 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="workout-form-step-content"
                  >
                    <div>
                      <h3 className="workout-form-section-title">Equipment & Workout Style</h3>
                      
                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Available Equipment *
                          <AutoFillIndicator fieldName="equipment" />
                        </label>
                        <div className="workout-form-option-grid">
                          {equipmentOptions.map((equipment) => (
                            <label key={equipment} className="workout-form-option-wrapper">
                              <input
                                {...register('equipment', { required: 'Please select available equipment' })}
                                type="radio"
                                value={equipment}
                                className="sr-only peer"
                              />
                              <div className="workout-form-option-card">
                                <span className="text-white text-sm font-medium">{equipment}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.equipment && (
                          <p className="workout-form-error">{errors.equipment.message}</p>
                        )}
                      </div>

                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Preferred Workout Style *
                          <AutoFillIndicator fieldName="workoutStyle" />
                        </label>
                        <div className="workout-form-option-grid">
                          {workoutStyles.map((style) => (
                            <label key={style} className="workout-form-option-wrapper">
                              <input
                                {...register('workoutStyle', { required: 'Please select a workout style' })}
                                type="radio"
                                value={style}
                                className="sr-only peer"
                              />
                              <div className="workout-form-option-card">
                                <span className="text-white text-sm font-medium">{style}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.workoutStyle && (
                          <p className="workout-form-error">{errors.workoutStyle.message}</p>
                        )}
                      </div>

                      <div className="workout-form-field-wrapper">
                        <label className="workout-form-label">
                          Physical Limitations or Injuries
                          <AutoFillIndicator fieldName="limitations" />
                        </label>
                        <textarea
                          {...register('limitations')}
                          className="workout-form-textarea"
                          rows={3}
                          placeholder="Describe any injuries, limitations, or exercises to avoid. This helps our AI create a safer, more personalized workout plan..."
                        />
                        <p className="workout-form-helper-text">
                          This information helps create a safer, more personalized workout plan
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: AI Generation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="workout-form-generation-content"
                  >
                    {isGenerating ? (
                      <div className="workout-form-generating">
                        <div className="workout-form-spinner">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary-600 border-t-transparent rounded-full"
                          />
                        </div>
                        <div className="workout-form-generating-text">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">AI is Creating Your Plan</h3>
                          <p className="text-gray-400 text-sm sm:text-base mb-6">
                            Our AI is analyzing your profile and generating a personalized workout plan...
                          </p>
                          <div className="workout-form-progress">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 4 }}
                              className="workout-form-progress-bar"
                            />
                            <p className="text-sm text-gray-500 mt-4">Analyzing your fitness profile...</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="workout-form-ready">
                        <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-primary-400 mx-auto mb-6" />
                        <div className="text-center">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Ready to Generate Your Plan</h3>
                          <p className="text-gray-400 text-sm sm:text-base">
                            Our AI will create a personalized workout plan based on your profile, goals, and preferences.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="workout-form-footer">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="workout-form-nav-btn workout-form-nav-btn-secondary"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <motion.button
                type="submit"
                disabled={isGenerating}
                className="workout-form-nav-btn workout-form-nav-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentStep === steps.length - 1 ? (
                  isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Generate Plan</span>
                    </>
                  )
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutPlanCreator;