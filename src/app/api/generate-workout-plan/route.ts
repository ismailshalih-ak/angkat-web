import { NextRequest, NextResponse } from "next/server";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from "zod";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { createClient } from "@/utils/supabase/server";
import { weeklyWorkoutPlanSchema } from "@/schemas/workout-plan";

export async function POST(request: NextRequest) {
  // const supabase = await createClient();;
  // const { data: { user }, error } = await supabase.auth.getUser();

  // if (error) {
  //   console.error('Error fetching user:', error);
  //   return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  // }

  // if (!user) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const requestBody = await request.json();

  const response = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages: [
      { role: "system", content: "Create a weekly workout plan for based on given data" },
      { role: "user", content: JSON.stringify(requestBody)},
    ],
    response_format: zodResponseFormat(weeklyWorkoutPlanSchema, "workoutPlan"),
  });

  console.log(response)

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("Response content is null");
  }
  const workoutPlan = weeklyWorkoutPlanSchema.parse(JSON.parse(content));

  return NextResponse.json({ workoutPlan });
}