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
import { Menu, X, User as UserIcon, Settings, LogOut } from 'lucide-react';

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: App Icon and Brand */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => router.push('/')}
              >
                <div className="p-1.5 rounded-lg mr-2">
                  <Image src="/icon.png" alt="Angkat" width={28} height={28} className="h-7 w-7" />
                </div>
                <span className="text-xl font-bold text-gray-800">Angkat</span>
              </div>
            </div>

            {/* Middle: Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg px-4"
                  onClick={() => router.push(link.path)}
                >
                  {link.name}
                </Button>
              ))}
            </div>

            {/* Right: Auth Buttons / Account Menu */}
            <div className="flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-0 h-10 w-10 overflow-hidden">
                      <Avatar className="h-10 w-10 border-2 border-emerald-100">
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium">
                          {getInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-lg border border-gray-200">
                    <div className="px-2 py-1.5 mb-1 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.user_metadata?.firstName || user.email}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2 rounded-lg hover:bg-gray-100"
                      onClick={() => router.push('/dashboard')}
                    >
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2 rounded-lg hover:bg-gray-100"
                      onClick={() => router.push('/dashboard/settings')}
                    >
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2 rounded-lg text-red-600 hover:bg-red-50 mt-1"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        router.push('/');
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                    onClick={() => router.push('/sign-in')}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm"
                    onClick={() => router.push('/sign-up')}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
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
                  className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm"
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
      <div className="h-16"></div> {/* Spacer to prevent content from hiding under fixed nav */}
    </>
  );
}