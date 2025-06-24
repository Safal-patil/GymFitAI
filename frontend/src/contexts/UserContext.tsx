import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTodayString, formatDate } from '../utils/dateUtils';

interface UserStats {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  bodyFat?: number;
  goal: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutsCompleted: number;
  currentStreak: number;
  totalWorkouts: number;
}

interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
  duration?: number;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
  type: 'strength' | 'cardio' | 'flexibility';
}

interface UserContextType {
  userStats: UserStats | null;
  workouts: Workout[];
  updateUserStats: (stats: Partial<UserStats>) => void;
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  completeExercise: (workoutId: string, exerciseId: string) => void;
  clearUserData: () => void;
  getTodaysWorkout: () => Workout | undefined;
  getWorkoutsByDate: (date: string) => Workout[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    // Load from localStorage
    const storedStats = localStorage.getItem('fitness-user-stats');
    const storedWorkouts = localStorage.getItem('fitness-workouts');
    
    if (storedStats) {
      setUserStats(JSON.parse(storedStats));
    }
    
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    } else {
      // Initialize with sample workouts
      const sampleWorkouts: Workout[] = [
        {
          id: '1',
          name: 'Push Day',
          date: new Date().toISOString().split('T')[0],
          completed: false,
          exercises: [
            { id: '1', name: 'Push-ups', sets: 3, reps: 15, completed: false, type: 'strength' },
            { id: '2', name: 'Bench Press', sets: 4, reps: 8, weight: 80, completed: false, type: 'strength' },
            { id: '3', name: 'Shoulder Press', sets: 3, reps: 12, weight: 30, completed: false, type: 'strength' }
          ]
        }
      ];
      setWorkouts(sampleWorkouts);
    }
  }, []);

  useEffect(() => {
    if (userStats) {
      localStorage.setItem('fitness-user-stats', JSON.stringify(userStats));
    }
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('fitness-workouts', JSON.stringify(workouts));
  }, [workouts]);

  const updateUserStats = (stats: Partial<UserStats>) => {
    setUserStats(prev => prev ? { ...prev, ...stats } : stats as UserStats);
  };

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    // Check if workout already exists for this date and name
    const existingWorkout = workouts.find(w => 
      w.date === workout.date && w.name === workout.name
    );
    
    if (existingWorkout) {
      console.log('Workout already exists for this date:', workout.date);
      return;
    }

    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString()
    };
    setWorkouts(prev => [...prev, newWorkout]);
  };

  const updateWorkout = (id: string, workout: Partial<Workout>) => {
    setWorkouts(prev => prev.map(w => {
      if (w.id === id) {
        const updatedWorkout = { ...w, ...workout };
        
        // Update user stats if workout is completed
        if (updatedWorkout.completed && !w.completed) {
          setUserStats(prevStats => prevStats ? {
            ...prevStats,
            workoutsCompleted: prevStats.workoutsCompleted + 1,
            totalWorkouts: prevStats.totalWorkouts + 1
          } : null);
        }
        
        return updatedWorkout;
      }
      return w;
    }));
  };

  const completeExercise = (workoutId: string, exerciseId: string) => {
    setWorkouts(prev => prev.map(workout => 
      workout.id === workoutId 
        ? {
            ...workout,
            exercises: workout.exercises.map(exercise =>
              exercise.id === exerciseId 
                ? { ...exercise, completed: true }
                : exercise
            )
          }
        : workout
    ));
  };

  const clearUserData = () => {
    setUserStats(null);
    setWorkouts([]);
    localStorage.removeItem('fitness-user-stats');
    localStorage.removeItem('fitness-workouts');
  };

  const getTodaysWorkout = (): Workout | undefined => {
    const today = getTodayString();
    return workouts.find(w => w.date === today && !w.completed);
  };

  const getWorkoutsByDate = (date: string): Workout[] => {
    return workouts.filter(w => w.date === date);
  };

  return (
    <UserContext.Provider value={{
      userStats,
      workouts,
      updateUserStats,
      addWorkout,
      updateWorkout,
      completeExercise,
      clearUserData,
      getTodaysWorkout,
      getWorkoutsByDate
    }}>
      {children}
    </UserContext.Provider>
  );
};