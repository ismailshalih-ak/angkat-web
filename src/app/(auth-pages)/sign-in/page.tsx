"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

    getSession();

    // Detect in-app browser
    const isInAppBrowser = navigator.userAgent.match(/(Instagram|Facebook|Line)\//i);

    if (isInAppBrowser) {
      // Redirect to default browser
      if (typeof window !== 'undefined') {
        window.open(window.location.href, '_blank');
      }
    }
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
              <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <Button onClick={handleSignInWithGoogle}
                  disabled={loading} 
                  variant="default" 
                  className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
