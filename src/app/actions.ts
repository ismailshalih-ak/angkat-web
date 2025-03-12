"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { WeeklyWorkoutPlan } from "@/schemas/workout-plan";

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

import { ProfileData } from "@/schemas/profile-data";

interface UserData {
  workoutPlan: WeeklyWorkoutPlan | null;
  profileData: Partial<ProfileData> | null;
}

export const getUserDataFromDatabase = async (): Promise<UserData | null> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return null;
  }

  const { data, error } = await supabase
    .from('workout_plans')
    .select('generated_workout_plan, profile_form_data')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }

  if (!data) {
    console.log("No user data found for user");
    return null;
  }

  return {
    workoutPlan: data.generated_workout_plan as WeeklyWorkoutPlan | null,
    profileData: data.profile_form_data,
  };
};
