import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { createClient } from "@/utils/supabase/server";
import { weeklyWorkoutPlanSchema } from "@/schemas/workout-plan";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { profileFormData, workoutPlan } = await request.json();

  // console.log(profileFormData, workoutPlan);

  const res = await supabase.from('workout_plans').insert([
    {
      user_id: user.id,
      profile_form_data: profileFormData,
      generated_workout_plan: workoutPlan
    }
  ]).select();

  return NextResponse.json({ message: 'Workout Plan saved', data: res }, { status: 200 });
}