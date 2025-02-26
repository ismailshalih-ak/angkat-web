"use client";

import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowRight, Dumbbell, LineChart, ClipboardList } from "lucide-react";

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
    const hash = pathname.split('#')[1];
    if (hash === 'features' && sectionFeaturesRef.current) {
      sectionFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (hash === 'pricing' && sectionPricingRef.current) {
      sectionPricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Nav />
      
      {/* Hero Section */}
      <main className="relative flex-grow flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/main-bg.jpg"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md">
            Transform Your <span className="text-emerald-400">Fitness Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Personalized workout plans, intelligent tracking, and real progress visualization - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted} 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Create Your Plan <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg rounded-full"
              onClick={() => sectionFeaturesRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features
            </Button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section 
        ref={sectionFeaturesRef} 
        id="features" 
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-emerald-500">Angkat</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to make your fitness journey seamless, effective, and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
              <div className="bg-emerald-100 p-3 rounded-xl inline-block mb-6">
                <Dumbbell className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalized Workouts</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive workout plans tailored specifically to your fitness level, goals, and available equipment. Our AI adapts your routine as you progress for optimal results.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
              <div className="bg-blue-100 p-3 rounded-xl inline-block mb-6">
                <ClipboardList className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Log your workouts effortlessly with our intuitive interface. Track sets, reps, and weights with detailed logs that help you stay consistent and motivated.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
              <div className="bg-purple-100 p-3 rounded-xl inline-block mb-6">
                <LineChart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visual Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                See your journey unfold through interactive charts and progress reports. Celebrate milestones and visualize improvements that keep you motivated.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              onClick={handleGetStarted} 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Start Your Fitness Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={sectionPricingRef} 
        id="pricing" 
        className="py-24 bg-gradient-to-b from-emerald-50 to-emerald-100"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-4">
                  EARLY ACCESS
                </span>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Free During Development
                </h2>
                <p className="text-xl text-gray-600">
                  Get full access to all premium features while we're building Angkat.
                </p>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <span className="text-5xl font-bold text-gray-800">$0</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personalized workout plans
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Progress tracking and analytics
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited workout logs
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Early access to new features
                </li>
              </ul>
              
              <div className="text-center">
                <Button 
                  onClick={handleGetStarted} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                </Button>
                <p className="text-gray-500 mt-4 text-sm">
                  No credit card required. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white">Angkat</h3>
              <p className="mt-2">Your personalized fitness journey</p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 Angkat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}