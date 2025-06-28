import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { getTodayString, formatDate } from '../utils/dateUtils';

interface UserStats {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  bodyFat?: number;
  goal: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutsCompleted: number;
  currentStreak: number;
  totalWorkouts: number;
  strengthInfo: {
    maxPushups: number;
    maxPullups: number;
    maxSquats: number;
    maxBenchKg: number;
    maxSquatkg: number;
    maxDeadliftkg: number;
  };
}

interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
  completed: boolean;
  duration?: number;
  difficulty?: string;
  workoutType?: string;
  targetMuscles?: string[];
}

interface WorkoutExercise {
  id: string;
  name: string;
  avgSets: number;
  avgReps: number;
  weight?: number;
  duration?: number;
  restPeriod?: number;
  instructions?: string;
  completed?: boolean;
  type: string;
  status: {
    completedByUser: boolean;
    completePercent: number;
    totalSets: number;
    completedSets: number;
    totalReps: number;
    completedReps: number;
  };
}

interface CalorieData {
  date: string;
  totalCaloriesBurnt: number;
  completionPercent: number;
}

interface UserContextType {
  userStats: UserStats | null;
  workouts: Workout[];
  planners: any[];
  calorieData: CalorieData[];
  loading: boolean;
  error: string | null;
  updateUserStats: (stats: Partial<UserStats>) => void;
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => Promise<boolean>;
  completeExercise: (workoutId: string, exerciseId: string) => boolean;
  clearUserData: () => void;
  getTodaysWorkout: () => Workout | undefined;
  getWorkoutsByDate: (date: string) => Workout[];
  refreshData: () => Promise<void>;
  syncWithServer: () => Promise<void>;
  givenDate: string;
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
  const [planners, setPlanners] = useState<any[]>([]);
  const [calorieData, setCalorieData] = useState<CalorieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [givenDate, setGivenDate] = useState(getTodayString());
  
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Mock data for demo
  const mockWorkouts: Workout[] = [
    {
      id: '1',
      name: 'Push Day Workout',
      date: getTodayString() + 'T00:00:00.000Z',
      completed: false,
      exercises: [
        {
          id: '1',
          name: 'Bench Press',
          avgSets: 4,
          avgReps: 8,
          weight: 80,
          type: 'strength',
          completed: false,
          status: {
            completedByUser: false,
            completePercent: 0,
            totalSets: 4,
            completedSets: 0,
            totalReps: 32,
            completedReps: 0
          }
        },
        {
          id: '2',
          name: 'Push-ups',
          avgSets: 3,
          avgReps: 15,
          type: 'strength',
          completed: false,
          status: {
            completedByUser: false,
            completePercent: 0,
            totalSets: 3,
            completedSets: 0,
            totalReps: 45,
            completedReps: 0
          }
        }
      ]
    }
  ];

  const mockCalorieData: CalorieData[] = [
    { date: '2025-01-10', totalCaloriesBurnt: 350, completionPercent: 85 },
    { date: '2025-01-11', totalCaloriesBurnt: 420, completionPercent: 92 },
    { date: '2025-01-12', totalCaloriesBurnt: 380, completionPercent: 78 },
    { date: '2025-01-13', totalCaloriesBurnt: 450, completionPercent: 95 },
    { date: '2025-01-14', totalCaloriesBurnt: 320, completionPercent: 70 }
  ];

  useEffect(() => {
    if (user) {
      loadMockData();
    } else {
      clearUserData();
    }
  }, [user]);

  const loadMockData = () => {
    setWorkouts(mockWorkouts);
    setCalorieData(mockCalorieData);
    
    if (user) {
      setUserStats({
        age: user.profile.age || 28,
        gender: user.profile.gender || 'male',
        height: user.profile.heightCm || 180,
        weight: user.profile.weightKg || 75,
        bodyFat: user.profile.bodyfat || 12,
        goal: user.preferences.goal || 'Build Muscle',
        fitnessLevel: user.profile.experienceLevel || 'intermediate',
        workoutsCompleted: user.profile.workoutsCompleted || 45,
        currentStreak: user.profile.currentStreak || 7,
        totalWorkouts: user.profile.totalWorkouts || 50,
        strengthInfo: user.strengthInfo
      });
    }
  };

  const syncWithServer = async () => {
    setLoading(true);
    try {
      // Mock sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      loadMockData();
    } catch (error: any) {
      setError(error.message || 'Failed to sync data');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStats = (stats: Partial<UserStats>) => {
    const newStats = userStats ? { ...userStats, ...stats } : stats as UserStats;
    setUserStats(newStats);
    localStorage.setItem('fitness-user-stats', JSON.stringify(newStats));
  };

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: `${workout.date}-${Date.now()}`
    };
    
    setWorkouts(prev => {
      const updated = [...prev, newWorkout];
      localStorage.setItem('fitness-workouts', JSON.stringify(updated));
      return updated;
    });
  };

  const updateWorkout = async (id: string, workoutUpdate: Partial<Workout>): Promise<boolean> => {
    try {
      setWorkouts(prev => {
        const updated = prev.map(w => {
          if (w.id === id) {
            const updatedWorkout = { ...w, ...workoutUpdate };
            
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
        });
        
        localStorage.setItem('fitness-workouts', JSON.stringify(updated));
        return updated;
      });

      return true;
    } catch (error) {
      console.error('Error updating workout:', error);
      return false;
    }
  };

  const completeExercise = (workoutId: string, exerciseId: string): boolean => {
    try {
      setWorkouts(prev => {
        const updated = prev.map(workout => 
          workout.id === workoutId 
            ? {
                ...workout,
                exercises: workout.exercises.map(exercise =>
                  exercise.id === exerciseId 
                    ? { ...exercise, status: { ...exercise.status, completedByUser: true } }
                    : exercise
                )
              }
            : workout
        );
        
        localStorage.setItem('fitness-workouts', JSON.stringify(updated));
        return updated;
      });
      
      return true;
    } catch (error) {
      console.error('Error completing exercise:', error);
      return false;
    }
  };

  const clearUserData = () => {
    setUserStats(null);
    setWorkouts([]);
    setPlanners([]);
    setCalorieData([]);
    setError(null);
    localStorage.removeItem('fitness-user-stats');
    localStorage.removeItem('fitness-workouts');
  };

  const getTodaysWorkout = (): Workout | undefined => {
    const today = getTodayString();
    return workouts.find(w => w.date.split('T')[0] === today && !w.completed);
  };

  const getWorkoutsByDate = (date: string): Workout[] => {
    return workouts.filter(w => w.date === date + "T00:00:00.000Z");
  };

  const refreshData = async () => {
    await syncWithServer();
  };

  return (
    <UserContext.Provider value={{
      userStats,
      workouts,
      planners,
      calorieData,
      loading,
      error,
      updateUserStats,
      addWorkout,
      updateWorkout,
      completeExercise,
      clearUserData,
      getTodaysWorkout,
      getWorkoutsByDate,
      refreshData,
      syncWithServer,
      givenDate
    }}>
      {children}
    </UserContext.Provider>
  );
};