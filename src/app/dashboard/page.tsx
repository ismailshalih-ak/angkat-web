"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Calendar, Dumbbell, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UnderConstructionTooltip } from '@/components/under-construction-tooltip';
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const router = useRouter();
  const { workoutPlan, loading } = useWorkoutPlan();

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
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
    
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome!
          </h1>
          <p className="text-emerald-50 text-lg">
            Track your fitness journey and achieve your goals
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-6">
        {!workoutPlan ? (
          <Card className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="bg-emerald-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Dumbbell className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-800">Create Your First Workout Plan</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get started by creating a personalized workout plan tailored to your fitness goals and preferences.
              </p>
              <Button 
                onClick={() => router.push('/dashboard/personalize')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Workout Plan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-gray-200 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">Your Current Workout Plan</CardTitle>
                    <CardDescription className="text-gray-600">
                      {workoutPlan.workoutPlanName}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    onClick={() => router.push('/dashboard/personalize')}
                  >
                    Create New Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {workoutPlan.sessions.map((session, index) => (
                      <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="p-4 border-b border-gray-100">
                          <div className="flex flex-col">
                            <div className="flex items-center text-emerald-500 text-sm font-medium">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{session.day}</span>
                            </div>
                            <CardTitle className="text-base font-semibold truncate mt-1">
                              {session.dayName}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-3">
                          {session.exercises.map((exercise, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">{exercise.name}</span>
                                <span className="text-gray-500">{exercise.sets} × {exercise.repetitions}</span>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 p-5">
                  <CardTitle className="text-xl font-bold text-gray-800">Track Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="text-gray-600 mb-4">
                    Record your workouts and track your fitness progress over time.
                  </p>
                  <UnderConstructionTooltip>
                    <Button 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => router.push('/dashboard/progress')}
                    >
                      View Progress
                    </Button>
                  </UnderConstructionTooltip>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-gray-200 p-5">
                  <CardTitle className="text-xl font-bold text-gray-800">Workout History</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="text-gray-600 mb-4">
                    View your past workouts and see how you&apos;ve improved over time.
                  </p>
                  <UnderConstructionTooltip>
                    <Button 
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      onClick={() => router.push('/dashboard/history')}
                    >
                      View History
                    </Button>
                  </UnderConstructionTooltip>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}