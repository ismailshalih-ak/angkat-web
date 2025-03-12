"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { getUserDataFromDatabase } from '@/app/actions';
import { WeeklyWorkoutPlan } from '@/schemas/workout-plan';
import { ProfileData } from '@/schemas/profile-data';

interface WorkoutPlanContextType {
  workoutPlan: WeeklyWorkoutPlan | null;
  profileData: Partial<ProfileData> | null;
  loading: boolean;
}

const WorkoutPlanContext = createContext<WorkoutPlanContextType | undefined>(undefined);

export const WorkoutPlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [workoutPlan, setWorkoutPlan] = useState<WeeklyWorkoutPlan | null>(null);
  const [profileData, setProfileData] = useState<Partial<ProfileData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUserDataFromDatabase();
        if (userData) {
          setWorkoutPlan(userData.workoutPlan);
          setProfileData(userData.profileData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Handle error appropriately (e.g., display an error message)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const value: WorkoutPlanContextType = {
    workoutPlan,
    profileData,
    loading,
  };

  return (
    <WorkoutPlanContext.Provider value={value}>
      {children}
    </WorkoutPlanContext.Provider>
  );
};

export const useWorkoutPlan = () => {
  const context = useContext(WorkoutPlanContext);
  if (!context) {
    throw new Error('useWorkoutPlan must be used within a WorkoutPlanProvider');
  }
  return context;
};
