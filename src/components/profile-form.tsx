"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

const formSchema = z.object({
  // Section 1
  age: z.number().min(1).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  measurementUnits: z.enum(["metric", "imperial"]).optional(),
  height: z.number().min(1).optional(),
  weight: z.number().min(1).optional(),
  bodyFat: z.number().min(0).max(100).optional(),

  // Section 2
  availableDays: z.array(z.string()).optional(),
  maxSessionsPerWeek: z.number().min(1).optional(),
  sessionDuration: z.enum(["30", "45", "60", "75", "90"]).optional(),
  timeOfDay: z.enum(["morning", "afternoon", "evening"]).optional(),

  // Section 3
  goal: z.string().optional(),
  experience: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  injuries: z.string().optional(),

  // Section 4
  exerciseType: z.enum(["strength", "cardio", "hiit", "flexibility", "other"]).optional(),
  equipment: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export default function ProfileForm() {
  const [workoutPlan, setWorkoutPlan] = useState<WeeklyWorkoutPlan | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      measurementUnits: "metric",
      height: undefined,
      weight: undefined,
      bodyFat: undefined,
      availableDays: [],
      maxSessionsPerWeek: undefined,
      sessionDuration: undefined,
      timeOfDay: undefined,
      goal: undefined,
      experience: undefined,
      injuries: undefined,
      exerciseType: undefined,
      equipment: [],
      notes: undefined,
    },
  });

  const measurementUnits = form.watch("measurementUnits");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const resWorkoutPlan = await generateWorkoutPlan(data);
      setWorkoutPlan(resWorkoutPlan);
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value? parseInt(e.target.value): undefined)} />
                    </FormControl>
                    {form.formState.errors.age && <FormMessage>{form.formState.errors.age.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="measurementUnits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement Units</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="metric" />
                        </FormControl>
                        <FormLabel>Metric (kg/cm)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="imperial" />
                        </FormControl>
                        <FormLabel>Imperial (lbs/in)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Height ({measurementUnits === "metric" ? "cm" : "in"})
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value? parseInt(e.target.value): undefined)} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Weight ({measurementUnits === "metric" ? "kg" : "lbs"})
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value? parseInt(e.target.value): undefined)}  />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bodyFat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Fat Percentage</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value? parseInt(e.target.value): undefined)} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="availableDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Days</FormLabel>
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
                name="maxSessionsPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Sessions per Week</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={1} max={form.watch("availableDays")?.length || 7} onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessionDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Duration (minutes)</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
              <FormField
                control={form.control}
                name="timeOfDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time of Day</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time of day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardHeader>
              <CardTitle>Workout Preferences</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Goal</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                          <SelectItem value="Muscle Gain and Toning">Muscle Gain and Toning</SelectItem>
                          <SelectItem value="Improved Cardiovascular Health">Improved Cardiovascular Health</SelectItem>
                          <SelectItem value="Enhanced Athletic Performance">Enhanced Athletic Performance</SelectItem>
                          <SelectItem value="Increased Flexibility and Mobility">Increased Flexibility and Mobility</SelectItem>
                          <SelectItem value="Stress Reduction and Mental Health">Stress Reduction and Mental Health</SelectItem>
                          <SelectItem value="General Health">General Health</SelectItem>
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
                    <FormLabel>Workout Experience</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                name="injuries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Injuries or Limitations</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Exercise Preferences</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="exerciseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Type of Exercise</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exercise type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                    <FormLabel>Access to Equipment</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Large Gym", "Small Gym", "Home Equipment", "Bodyweight Only"].map((equipment) => (
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
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{equipment}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Other Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

            <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
            </Button>
        </form>
      </Form>
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
          <Button onClick={async () => {
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

                alert('Workout plan saved successfully');
          }}>Save</Button>
        </div>
      )}

    </div>
  );
}
