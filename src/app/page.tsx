"use client";

import Nav from "@/components/nav";
import ProfileForm from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
  const sectionFeaturesRef = useRef<HTMLDivElement>(null);
  const sectionPricingRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes('#')) return;
    const hash = pathname.split('#')[1]; // e.g., "features"
    // Map hash to ref
    if (hash === 'features' && sectionFeaturesRef.current) {
      sectionFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (hash === 'pricing' && sectionPricingRef.current) {
      sectionPricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // You can add more mappings for other sections as needed.
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />

      <main className="relative flex-grow flex items-center justify-center p-8 h-screen">
        <img
          src="/main-bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Angkat
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your personalized fitness journey starts here.
          </p>
          <Button onClick={handleGetStarted}>Create your workout plan</Button>
        </div>
      </main>

      <section ref={sectionFeaturesRef} id="features" className="bg-white py-12 h-screen flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Features
          </h2>
          <p className="text-gray-500 mb-8">
            Discover the amazing features that make Angkat the best choice for your fitness journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Feature 1: Personalized Workout */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Workout</h3>
              <p className="text-gray-600">
                Receive workout plans tailored just for you based on your fitness level, goals, and available equipment.
                Our intelligent generator adapts your routine as you progress, ensuring every session is challenging and effective.
              </p>
            </div>
            {/* Feature 2: Workout Tracking */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Workout Tracking</h3>
              <p className="text-gray-600">
                Log your workouts effortlessly and keep track of your performance with detailed logs for sets, reps, and weights.
                Stay motivated as you monitor your performance and adjust your training to continuously improve.
              </p>
            </div>
            {/* Feature 3: View Your Progress */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">View Your Progress</h3>
              <p className="text-gray-600">
                Visualize your fitness journey through interactive charts and progress reports.
                Track improvements over time, celebrate milestones, and see the real impact of your hard work.
              </p>
            </div>
          </div>
          <Button onClick={handleGetStarted}>Try Now</Button>
        </div>
      </section>

      <section ref={sectionPricingRef} id="pricing" className="bg-gray-200 py-12 h-screen flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Pricing
          </h2>
          <p className="text-gray-500 mb-8">
            No Price for now, FREE while we develop the app!
          </p>
          <Button onClick={handleGetStarted}>Try Now</Button>
        </div>
      </section>

      <footer className="bg-white text-center p-4 text-gray-500">
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
        </div>
        <p>&copy; 2024 Angkat. All rights reserved.</p>
      </footer>
    </div>
  );
}