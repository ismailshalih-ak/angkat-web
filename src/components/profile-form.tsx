"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { WeeklyWorkoutPlan } from "@/schemas/workout-plan";
import { ArrowLeft, Calendar, Dumbbell, Target } from "lucide-react";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  // Core questions
  experience: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  goal: z.string().optional(),
  availableDays: z.array(z.string()).optional(),
  sessionDuration: z.enum(["30", "45", "60", "75", "90"]).optional(),
  exerciseType: z.enum(["strength", "cardio", "hiit", "flexibility", "other"]).optional(),
  equipment: z.array(z.string()).optional(),
  injuriesAndNotes: z.string().optional(),
});

export default function ProfileForm() {
  const [workoutPlan, setWorkoutPlan] = useState<WeeklyWorkoutPlan | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: undefined,
      goal: undefined,
      availableDays: [],
      sessionDuration: undefined,
      exerciseType: undefined,
      equipment: [],
      injuriesAndNotes: undefined,
    },
  });

  // const measurementUnits = form.watch("measurementUnits");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const resWorkoutPlan = await generateWorkoutPlan(data);
      setWorkoutPlan(resWorkoutPlan);
      saveWorkoutPlan(resWorkoutPlan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateWorkoutPlan = async (data: z.infer<typeof formSchema>)=> {
  
    const response = await fetch('/api/generate-workout-plan', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to generate workout plan');
    }

    const resWorkoutPlan = await response.json();
  
    return resWorkoutPlan;
  };

  const saveWorkoutPlan = async (workoutPlan: WeeklyWorkoutPlan) => {
    const response = await fetch('/api/save-workout-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({profileFormData: form.getValues(), workoutPlan: workoutPlan}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save workout plan');
      }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="mb-4 flex">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Workout Preferences */}
          <Card className="rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Workout Preferences</CardTitle>
              </div>
              <CardDescription>
                Tell us about your fitness goals and experience
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Workout Goal</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg">
                          <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                          <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                          <SelectItem value="Improved Fitness">Improved Fitness</SelectItem>
                          <SelectItem value="Strength">Strength</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Workout Experience</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg">
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exerciseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Preferred Type of Exercise</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                            <SelectValue placeholder="Select exercise type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg">
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="hiit">HIIT</SelectItem>
                          <SelectItem value="flexibility">Flexibility</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Access to Equipment</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Gym", "Home Equipment", "Bodyweight Only"].map((equipment) => (
                        <FormItem key={equipment} className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(equipment) ?? false}
                              onCheckedChange={(checked) => {
                                const value = field.value ?? [];
                                return checked
                                  ? field.onChange([...value, equipment])
                                  : field.onChange(value.filter((val) => val !== equipment));
                              }}
                              className="text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{equipment}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 2: Availability */}
          <Card className="rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Availability</CardTitle>
              </div>
              <CardDescription>
                Let us know when you can work out
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <FormField
                control={form.control}
                name="availableDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Available Days</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <FormItem key={day} className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(day)}
                              onCheckedChange={(checked) => {
                                const value = field.value ?? [];
                                return checked
                                  ? field.onChange([...value, day])
                                  : field.onChange(value.filter((val) => val !== day));
                              }}
                              className="text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{day}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessionDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Session Duration (minutes)</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg">
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                          <SelectItem value="60">60</SelectItem>
                          <SelectItem value="75">75</SelectItem>
                          <SelectItem value="90">90</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 3: Additional Information */}
          <Card className="rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Additional Information</CardTitle>
              </div>
              <CardDescription>
                Any injuries or other notes we should consider
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="injuriesAndNotes"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-medium text-gray-700">Injuries, Limitations, or other constraints</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                        placeholder="Examples: Lower back pain, knee injury, prefer morning workouts, need low-impact exercises, etc."
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Generating Plan...
              </div>
            ) : (
              "Generate Workout Plan"
            )}
          </Button>
        </form>
      </Form>
      {workoutPlan && (
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 text-center">Your Personalized Workout Plan</h2>
            <p className="text-lg font-medium text-emerald-50 text-center">{workoutPlan.workoutPlanName}</p>
          </div>
          
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {workoutPlan.sessions.map((session, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 border-b border-gray-200">
                    <div className="flex flex-col">
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{session.day}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mt-0.5">{session.dayName}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {session.exercises.map((exercise, idx) => (
                      <div key={idx} className={`py-3 ${idx !== session.exercises.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-800">{exercise.name}</span>
                          <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            {exercise.sets} sets × {exercise.repetitions} reps
                          </span>
                        </div>
                        {exercise.description && (
                          <p className="text-sm text-gray-600">{exercise.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-center">
            <p className="text-sm text-gray-500">
              This plan is tailored to your fitness goals and preferences.
            </p>
          </div>
        </div>
      )}
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        onClick={() => router.push('/dashboard')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  );
}
