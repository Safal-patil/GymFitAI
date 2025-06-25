import { apiClient, retryRequest, ApiResponse } from './api';

// Planner Types
interface PlannerDay {
  date: string;
  exercises: string[]; // Exercise IDs
}

interface Planner {
  _id: string;
  userId: string;
  days: PlannerDay[];
  nutrition: string[];
  recommendations: string[];
  goals: string[];
  prediction: string[];
  createdAt: string;
  expireAt: string;
}

interface PlannerReport {
  nutrition: string[];
  recommendations: string[];
  goals: string[];
  prediction: string[];
}

class PlannerService {
  // Get planner by user
  async getPlannerByUser(): Promise<Planner[]> {
    try {
      const response = await retryRequest(() => 
        apiClient.get<ApiResponse<Planner[]>>('/planner/plannerbyuser')
      );
      
      return response;
    } catch (error) {
      console.error('Failed to fetch user planner:', error);
      throw error;
    }
  }

  // Get planner report (Premium feature)
  async getPlannerReport(): Promise<PlannerReport> {
    try {
      const response = await retryRequest(() => 
        apiClient.get<ApiResponse<PlannerReport>>('/planner/plannerreport')
      );
      
      return response;
    } catch (error) {
      console.error('Failed to fetch planner report:', error);
      throw error;
    }
  }
}

export const plannerService = new PlannerService();
export type { Planner, PlannerDay, PlannerReport };