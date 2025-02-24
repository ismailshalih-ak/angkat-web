"use client";

import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client';

export default function SignIn() {
  const [supabase] = useState(() => createClient());
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        router.push('/dashboard')
      }
    }

    getSession()
  }, [router, supabase])

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error('Google sign-in error:', error);
        // Handle error appropriately (e.g., display an error message)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Sign in with your Google Account
      </p>
      <button
        onClick={handleSignInWithGoogle}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  )
}