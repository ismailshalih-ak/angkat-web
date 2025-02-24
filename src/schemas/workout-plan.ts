import { z } from "zod";

const exerciseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  sets: z.number(),
  repetitions: z.number(),
});

// Define the Day schema
const daySchema = z.object({
  day: z.enum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]),
  dayName: z.string(),
  exercises: z.array(exerciseSchema),
});

// Define the Weekly Workout Plan schema
export const weeklyWorkoutPlanSchema = z.object({
  workoutPlanName: z.string(),
  sessions: z.array(daySchema),
  notes: z.string().optional(),
});

export type WeeklyWorkoutPlan = z.infer<typeof weeklyWorkoutPlanSchema>;

// Example usage
const examplePlan = {
  weekStartDate: '2025-02-24',
  sessions: [
    {
      day: 'Monday',
      dayName: 'Pull Day',
      exercises: [
        {
          name: 'Pull-ups',
          description: 'Upper body exercise targeting back and biceps',
          sets: 3,
          repetitions: 10,
        },
        // Add more exercises as needed
      ],
    },
    // Define other days...
  ],
};