"use client";

import Nav from "@/components/nav";
import ProfileForm from "@/components/profile-form";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Page() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User|null>(null);
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

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      // Remove the code parameter from the URL
      url.searchParams.delete('code');
      window.history.replaceState({}, document.title, url.toString());
    }
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <ProfileForm />
      </div>
    </div>
  );
}