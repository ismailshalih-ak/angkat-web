"use client";

import Nav from "@/components/nav";
import ProfileForm from "@/components/profile-form";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { WeeklyWorkoutPlan } from "@/schemas/workout-plan";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User|null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WeeklyWorkoutPlan|null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        router.push("/sign-in");
      }

      if(user) {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        if (code) {
          // Remove the code parameter from the URL
          url.searchParams.delete('code');
          window.history.replaceState({}, document.title, url.toString());
        }
      }
    }

    getUserData();
  }, [supabase, router]);
  
  useEffect(() => {
    async function fetchLatestWorkoutPlan() {
      if (user) {
        const { data, error } = await supabase
          .from('workout_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching workout plan:', error);
        } else {
          setWorkoutPlan(data.generated_workout_plan);
          // console.log(data.generated_workout_plan);
        }
      }
    }

    fetchLatestWorkoutPlan();
  }, [supabase, user]);

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
      {workoutPlan && (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          {/* <pre>{JSON.stringify(workoutPlan)}</pre> */}
          <h2 className="text-2xl font-bold mb-4 text-center">Generated Workout Plan</h2>
          <p className="text-lg font-semibold mb-6 text-center">{workoutPlan.workoutPlanName}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {workoutPlan.sessions.map((session, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{session.dayName} ({session.day})</h3>
                  {session.exercises.map((exercise, idx) => (
                    <div key={idx} className="border-b pb-2 mb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{exercise.name}</span>
                        <span>{exercise.sets} sets x {exercise.repetitions} reps</span>
                      </div>
                      {exercise.description && (
                        <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
        <Button onClick={() => router.push('/dashboard/personalize')}>Generate New Workout Plan</Button>
      </div>
    </div>
  );
}