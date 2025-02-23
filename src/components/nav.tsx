"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Nav() {
  const [supabase] = useState(() => createClientComponentClient());
  const [user, setUser] = useState<{ user_metadata?: { firstName?: string; lastName?: string; avatar_url?: string }; email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }

    getUserData();
  }, [supabase]);

  // Function to get initials from the user's name
  const getInitials = (user) => {
    if (user?.user_metadata?.firstName && user?.user_metadata?.lastName) {
      return `${user.user_metadata.firstName.charAt(0)}${user.user_metadata.lastName.charAt(0)}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "AB"; // Default initials if no name or email
  };

  return (
    <nav className="relative flex items-center justify-between p-4">
      {/* Left: App Icon */}
      <div className="flex items-center">
        <img src="/icon.png" alt="App Icon" className="h-8 w-8" />
        <span className="ml-2 text-xl font-bold">Angkat</span>
      </div>

      {/* Middle: Call to Action */}
      <div className="mx-auto">
        {user ? (
          <Button onClick={() => router.push('/dashboard')}>
            My Workout Plan
          </Button>
        ) : (
          <Button>Generate Workout Plan</Button>
        )}
      </div>

      {/* Right: Auth Buttons / Account Menu */}
      <div className="flex items-center">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url || "/path/to/profile-image.jpg"} alt="Profile" />
                <AvatarFallback>{getInitials(user)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/dashboard/plans')}>My Plans</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help/FAQs</DropdownMenuItem>
              <DropdownMenuItem onClick={async () => {
                await supabase.auth.signOut();
                router.push('/'); // Redirect to landing page after sign out
              }}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="ghost" onClick={() => router.push('/sign-in')}>
              Sign In
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}