interface ProfileData {
  experience?: "beginner" | "intermediate" | "advanced";
  goal?: string;
  availableDays?: string[];
  sessionDuration?: "30" | "45" | "60" | "75" | "90";
  exerciseType?: "strength" | "cardio" | "hiit" | "flexibility" | "other";
  equipment?: string[];
  injuriesAndNotes?: string;
}

export type { ProfileData };
