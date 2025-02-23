"use client";

import Nav from "@/components/nav";
import ProfileForm from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Angkat Web
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your personalized fitness journey starts here.
          </p>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </main>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Mobile App Coming Soon!
          </h2>
          <p className="text-gray-500 mb-8">
            Stay tuned for our mobile app, designed to make your fitness
            journey even more accessible and convenient.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Globe className="h-6 w-6 text-gray-700" />
            <p className="text-gray-500">Web Access</p>
            <Smartphone className="h-6 w-6 text-gray-700" />
            <p className="text-gray-500">Mobile App (Coming Soon)</p>
          </div>
        </div>
      </section>

      <footer className="bg-white text-center p-4 text-gray-500">
        <p>&copy; 2024 Angkat Web. All rights reserved.</p>
      </footer>
    </div>
  );
}