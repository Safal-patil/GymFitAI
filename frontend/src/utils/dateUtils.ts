/**
 * Date utility functions for consistent date handling across the application
 */

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getTodayString = (): string => {
  return formatDate(new Date());
};

export const getTomorrowString = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDate(tomorrow);
};

export const getDateString = (daysFromToday: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return formatDate(date);
};

export const isToday = (dateString: string): boolean => {
  return dateString === getTodayString();
};

export const isPastDate = (dateString: string): boolean => {
  return dateString < getTodayString();
};

export const isFutureDate = (dateString: string): boolean => {
  return dateString > getTodayString();
};

export const parseDateString = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00.000Z');
};

export const formatDisplayDate = (dateString: string): string => {
  const date = parseDateString(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysInWeek = (startDate?: Date): string[] => {
  const start = startDate || new Date();
  const week = [];
  
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(start);
  startOfWeek.setDate(start.getDate() - start.getDay());
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    week.push(formatDate(day));
  }
  
  return week;
};