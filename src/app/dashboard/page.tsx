"use client";

import Nav from "@/components/nav";
import ProfileForm from "@/components/profile-form";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        router.push("/sign-in");
      }
    }

    getUserData();
  }, [supabase, router]);

  if (!user) {
    return <div>Loading...</div>; // Or a more informative message
  }

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <ProfileForm />
      </div>
    </div>
  );
}