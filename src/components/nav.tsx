"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }

    getUserData();
  }, [supabase]);

  const getInitials = (user: User) => {
    if (user?.user_metadata?.firstName && user?.user_metadata?.lastName) {
      return `${user.user_metadata.firstName.charAt(0)}${user.user_metadata.lastName.charAt(0)}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "AB";
  };

  const navLinks = user ? [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Workout', path: '/dashboard/workout' },
    { name: 'Progress', path: '/dashboard/progress' },
  ] : [
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-6">
        {/* Left: App Icon and Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="flex items-center">
            <Image src="/icon.png" alt="App Icon" width={32} height={32} className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">Angkat</span>
          </div>
        </div>

        {/* Middle: Desktop Navigation */}
        <div className="hidden md:flex gap-4 mx-auto">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="link"
              onClick={() => {
                router.push(link.path);
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </Button>
          ))}
        </div>

        {/* Right: Auth Buttons / Account Menu */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
                  <AvatarFallback>{getInitials(user)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    router.push(link.path);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </Button>
              ))}
              {!user && (
                <Button
                  variant="default"
                  className="mt-2"
                  onClick={() => {
                    router.push('/sign-in');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16"></div>
    </>
  );
}