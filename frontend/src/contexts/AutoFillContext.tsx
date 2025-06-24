import React, { createContext, useContext, useState, useEffect } from 'react';

interface AutoFillData {
  // Personal Info
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  bodyFat?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  
  // Goals & Preferences
  goal?: string;
  daysPerWeek?: number;
  sessionDuration?: number;
  availableTime?: string;
  
  // Equipment & Style
  equipment?: string;
  workoutStyle?: string;
  limitations?: string;
  
  // Additional metadata
  lastUpdated?: string;
  planCount?: number;
}

interface AutoFillContextType {
  autoFillData: AutoFillData | null;
  saveAutoFillData: (data: AutoFillData) => void;
  clearAutoFillData: () => void;
  hasAutoFillData: boolean;
  getFieldValue: (fieldName: keyof AutoFillData) => any;
  isFieldAutoFilled: (fieldName: keyof AutoFillData) => boolean;
}

const AutoFillContext = createContext<AutoFillContextType | undefined>(undefined);

export const useAutoFill = () => {
  const context = useContext(AutoFillContext);
  if (context === undefined) {
    throw new Error('useAutoFill must be used within an AutoFillProvider');
  }
  return context;
};

export const AutoFillProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [autoFillData, setAutoFillData] = useState<AutoFillData | null>(null);

  useEffect(() => {
    // Load auto-fill data from localStorage on mount
    const storedData = localStorage.getItem('fitness-autofill-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAutoFillData(parsedData);
      } catch (error) {
        console.error('Failed to parse auto-fill data:', error);
        localStorage.removeItem('fitness-autofill-data');
      }
    }
  }, []);

  const saveAutoFillData = (data: AutoFillData) => {
    const updatedData = {
      ...data,
      lastUpdated: new Date().toISOString(),
      planCount: (autoFillData?.planCount || 0) + 1
    };
    
    setAutoFillData(updatedData);
    localStorage.setItem('fitness-autofill-data', JSON.stringify(updatedData));
  };

  const clearAutoFillData = () => {
    setAutoFillData(null);
    localStorage.removeItem('fitness-autofill-data');
  };

  const hasAutoFillData = autoFillData !== null && Object.keys(autoFillData).length > 0;

  const getFieldValue = (fieldName: keyof AutoFillData) => {
    return autoFillData?.[fieldName];
  };

  const isFieldAutoFilled = (fieldName: keyof AutoFillData) => {
    return autoFillData?.[fieldName] !== undefined;
  };

  return (
    <AutoFillContext.Provider value={{
      autoFillData,
      saveAutoFillData,
      clearAutoFillData,
      hasAutoFillData,
      getFieldValue,
      isFieldAutoFilled
    }}>
      {children}
    </AutoFillContext.Provider>
  );
};