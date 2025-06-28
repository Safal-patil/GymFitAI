import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, CheckCircle, Plus, Minus, Timer, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUser } from '../contexts/UserContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useWorkouts } from '../hooks/useWorkouts';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
  type: 'strength' | 'cardio' | 'flexibility';
}

interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
  duration?: number;
}

interface WorkoutTrackerProps {
  workout: Workout;
  onComplete: () => void;
  onError?: (error: string) => void;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ workout, onComplete, onError }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [workoutStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  
  const { updateWorkout, completeExercise } = useUser();
  const { addNotification } = useNotifications();
  const { updateExerciseStatus, loading } = useWorkouts();

  const currentExercise = workout.exercises[currentExerciseIndex];
  const completedExercises = workout.exercises.filter(e => e.completed).length;
  const progressPercentage = (completedExercises / workout.exercises.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - workoutStartTime);
      
      if (isResting && restTimer > 0) {
        setRestTimer(prev => prev - 1);
      } else if (isResting && restTimer === 0) {
        setIsResting(false);
        addNotification({
          type: 'info',
          title: 'Rest Complete!',
          message: 'Time to start your next set.'
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [workoutStartTime, isResting, restTimer, addNotification]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startRest = (duration: number = 60) => {
    setRestTimer(duration);
    setIsResting(true);
  };

  const completeSet = async () => {
    try {
      setHasError(false);
      
      if (currentSet < currentExercise.sets) {
        setCurrentSet(prev => prev + 1);
        startRest();
      } else {
        // Complete the exercise
        const success = completeExercise(workout.id, currentExercise.id);
        
        if (!success) {
          throw new Error('Failed to complete exercise');
        }
        
        // Update server
        await updateExerciseStatus([{
          _id: currentExercise.id,
          status: {
            completedByUser: true,
            totalSets: currentExercise.sets,
            completedSets: currentExercise.sets,
            totalReps: currentExercise.sets * currentExercise.reps,
            completedReps: currentExercise.sets * currentExercise.reps,
            completePercent: 100
          }
        }]);
        
        // Confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Move to next exercise or complete workout
        if (currentExerciseIndex < workout.exercises.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
          setCurrentSet(1);
        } else {
          // Workout completed
          const duration = Math.floor((Date.now() - workoutStartTime) / 1000 / 60);
          await updateWorkout(workout.id, { completed: true, duration });
          
          // Big confetti celebration
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
          });

          addNotification({
            type: 'success',
            title: 'Workout Complete! 🎉',
            message: `Amazing job! You completed ${workout.name} in ${formatTime(Date.now() - workoutStartTime)}.`
          });

          onComplete();
        }
      }
    } catch (error) {
      console.error('Error completing set:', error);
      setHasError(true);
      
      if (onError) {
        onError('An error occurred while completing the set.');
      }
      
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to save progress. Please try again.'
      });
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimer(0);
  };

  // Reset error state when exercise changes
  useEffect(() => {
    setHasError(false);
  }, [currentExerciseIndex]);

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/60 rounded-xl p-6 border border-gray-700"
      >
        {/* Workout Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">{workout.name}</h3>
            <p className="text-gray-400">Exercise {currentExerciseIndex + 1} of {workout.exercises.length}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-400">{formatTime(elapsedTime)}</div>
            <p className="text-sm text-gray-400">Duration</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-primary-400">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-2 bg-gradient-to-r from-primary-600 to-neon-pink rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Current Exercise */}
        {currentExercise && (
          <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">{currentExercise.name}</h4>
              <div className="px-3 py-1 bg-primary-500/20 rounded-full text-sm text-primary-300">
                {currentExercise.type}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentSet}</div>
                <div className="text-sm text-gray-400">Set</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentExercise.reps}</div>
                <div className="text-sm text-gray-400">Reps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentExercise.weight || '-'}</div>
                <div className="text-sm text-gray-400">Weight (kg)</div>
              </div>
            </div>

            {/* Rest Timer */}
            {isResting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 bg-orange-500/10 rounded-lg border border-orange-500/30 mb-4"
              >
                <Timer className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-orange-400 mb-2">{restTimer}s</div>
                <p className="text-orange-300 text-sm mb-4">Rest time remaining</p>
                <button
                  onClick={skipRest}
                  className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors duration-200"
                >
                  Skip Rest
                </button>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={completeSet}
                disabled={isResting || hasError || loading}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  hasError 
                    ? 'bg-gradient-to-r from-red-600 to-red-700' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-green-500/25'
                }`}
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span>
                  {loading ? 'Saving...' : hasError ? 'Error - Retry' : 'Complete Set'}
                </span>
              </button>

              <button className="px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200">
                <Plus className="w-5 h-5 text-white" />
              </button>

              <button className="px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200">
                <Minus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Exercise List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 mb-3">All Exercises</h4>
          {workout.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                index === currentExerciseIndex 
                  ? 'bg-primary-500/20 border border-primary-500/30' 
                  : exercise.completed
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-gray-700/30 border border-gray-600/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  exercise.completed 
                    ? 'bg-green-500 text-white' 
                    : index === currentExerciseIndex
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-600 text-gray-400'
                }`}>
                  {exercise.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : index === currentExerciseIndex ? (
                    <Play className="w-3 h-3" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span className={`font-medium ${
                  exercise.completed ? 'text-green-400' : 'text-white'
                }`}>
                  {exercise.name}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {exercise.sets} × {exercise.reps} {exercise.weight ? `@ ${exercise.weight}kg` : ''}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default WorkoutTracker;