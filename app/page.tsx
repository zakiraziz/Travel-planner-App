import React from "react";
import { Map as MapIcon, Calendar, Share2, Globe, Compass, Users, Clock, Bookmark } from "lucide-react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";
import { motion } from "framer-motion";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-white to-blue-50 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500">
                Plan your perfect trip, every time
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Create itineraries, organize destinations, and share your travel
                plans all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {isLoggedIn ? (
                    "Go to Dashboard"
                  ) : (
                    <>
                      <span className="font-medium">Get Started for Free</span>
                    </>
                  )}
                </AuthButton>
                <button className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-50 px-8 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm hover:shadow-md border border-gray-200">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Screenshot Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 max-w-5xl mx-auto px-4 relative z-10"
          >
            <div className="rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-800 p-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8">
                <img 
                  src="/images/app-screenshot.png" 
                  alt="App Preview" 
                  className="w-full h-auto rounded-lg shadow-sm border border-gray-200"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Logo Cloud */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500 mb-8">Trusted by travelers from companies like</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              {['Booking', 'Airbnb', 'LonelyPlanet', 'NationalGeographic', 'TripAdvisor'].map((logo) => (
                <img 
                  key={logo}
                  src={`/images/logos/${logo.toLowerCase()}.svg`} 
                  alt={logo}
                  className="h-8 opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Plan with confidence</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create the perfect travel itinerary
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <MapIcon className="h-6 w-6 text-blue-600" />, 
                  bg: "bg-blue-100",
                  title: "Interactive Maps",
                  desc: "Visualize your trip with interactive maps. See your entire itinerary at a glance."
                },
                { 
                  icon: <Calendar className="h-6 w-6 text-amber-600" />, 
                  bg: "bg-amber-100",
                  title: "Day-by-Day Itineraries",
                  desc: "Organize your trip day by day. Never miss a beat with structured planning."
                },
                { 
                  icon: <Share2 className="h-6 w-6 text-green-600" />, 
                  bg: "bg-green-100",
                  title: "Share with Friends",
                  desc: "Collaborate with travel companions and share your perfect itinerary."
                },
                { 
                  icon: <Globe className="h-6 w-6 text-purple-600" />, 
                  bg: "bg-purple-100",
                  title: "Destination Insights",
                  desc: "Get recommendations for attractions, restaurants, and hidden gems."
                },
                { 
                  icon: <Compass className="h-6 w-6 text-red-600" />, 
                  bg: "bg-red-100",
                  title: "Route Optimization",
                  desc: "Automatically optimize your route between destinations to save time."
                },
                { 
                  icon: <Bookmark className="h-6 w-6 text-indigo-600" />, 
                  bg: "bg-indigo-100",
                  title: "Save Favorites",
                  desc: "Bookmark places you want to visit and easily add them to any trip."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">How TripPlanner Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create your perfect trip in just a few simple steps
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Create a New Trip",
                  description: "Start by naming your trip and adding destinations. Our smart suggestions help you pick the best places.",
                  icon: <Compass className="h-8 w-8" />
                },
                {
                  step: "2",
                  title: "Build Your Itinerary",
                  description: "Drag and drop activities into days. We'll automatically optimize the order based on locations and opening hours.",
                  icon: <Calendar className="h-8 w-8" />
                },
                {
                  step: "3",
                  title: "Add Travel Details",
                  description: "Include flights, hotels, and transportation. We'll keep everything organized in one place.",
                  icon: <Clock className="h-8 w-8" />
                },
                {
                  step: "4",
                  title: "Share & Collaborate",
                  description: "Invite travel companions to view and edit the itinerary. Everyone stays on the same page.",
                  icon: <Users className="h-8 w-8" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row ${index !== 3 ? 'mb-12' : ''}`}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4 md:mb-0 md:mr-8">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="mr-3 text-blue-600">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 pl-11">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing isLoggedIn={isLoggedIn} />

        {/* FAQ Section */}
        <FAQ />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to plan your next adventure?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of travelers who plan better trips with TripPlanner.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <AuthButton
                isLoggedIn={isLoggedIn}
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started for Free"}
              </AuthButton>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Examples</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} TripPlanner. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}import React from "react";
import { Map as MapIcon, Calendar, Share2, Globe, Compass, Users, Clock, Bookmark } from "lucide-react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";
import { motion } from "framer-motion";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-white to-blue-50 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500">
                Plan your perfect trip, every time
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Create itineraries, organize destinations, and share your travel
                plans all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {isLoggedIn ? (
                    "Go to Dashboard"
                  ) : (
                    <>
                      <span className="font-medium">Get Started for Free</span>
                    </>
                  )}
                </AuthButton>
                <button className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-50 px-8 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm hover:shadow-md border border-gray-200">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Screenshot Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 max-w-5xl mx-auto px-4 relative z-10"
          >
            <div className="rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-800 p-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white p-8">
                <img 
                  src="/images/app-screenshot.png" 
                  alt="App Preview" 
                  className="w-full h-auto rounded-lg shadow-sm border border-gray-200"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Logo Cloud */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500 mb-8">Trusted by travelers from companies like</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              {['Booking', 'Airbnb', 'LonelyPlanet', 'NationalGeographic', 'TripAdvisor'].map((logo) => (
                <img 
                  key={logo}
                  src={`/images/logos/${logo.toLowerCase()}.svg`} 
                  alt={logo}
                  className="h-8 opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Plan with confidence</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create the perfect travel itinerary
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <MapIcon className="h-6 w-6 text-blue-600" />, 
                  bg: "bg-blue-100",
                  title: "Interactive Maps",
                  desc: "Visualize your trip with interactive maps. See your entire itinerary at a glance."
                },
                { 
                  icon: <Calendar className="h-6 w-6 text-amber-600" />, 
                  bg: "bg-amber-100",
                  title: "Day-by-Day Itineraries",
                  desc: "Organize your trip day by day. Never miss a beat with structured planning."
                },
                { 
                  icon: <Share2 className="h-6 w-6 text-green-600" />, 
                  bg: "bg-green-100",
                  title: "Share with Friends",
                  desc: "Collaborate with travel companions and share your perfect itinerary."
                },
                { 
                  icon: <Globe className="h-6 w-6 text-purple-600" />, 
                  bg: "bg-purple-100",
                  title: "Destination Insights",
                  desc: "Get recommendations for attractions, restaurants, and hidden gems."
                },
                { 
                  icon: <Compass className="h-6 w-6 text-red-600" />, 
                  bg: "bg-red-100",
                  title: "Route Optimization",
                  desc: "Automatically optimize your route between destinations to save time."
                },
                { 
                  icon: <Bookmark className="h-6 w-6 text-indigo-600" />, 
                  bg: "bg-indigo-100",
                  title: "Save Favorites",
                  desc: "Bookmark places you want to visit and easily add them to any trip."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">How TripPlanner Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create your perfect trip in just a few simple steps
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Create a New Trip",
                  description: "Start by naming your trip and adding destinations. Our smart suggestions help you pick the best places.",
                  icon: <Compass className="h-8 w-8" />
                },
                {
                  step: "2",
                  title: "Build Your Itinerary",
                  description: "Drag and drop activities into days. We'll automatically optimize the order based on locations and opening hours.",
                  icon: <Calendar className="h-8 w-8" />
                },
                {
                  step: "3",
                  title: "Add Travel Details",
                  description: "Include flights, hotels, and transportation. We'll keep everything organized in one place.",
                  icon: <Clock className="h-8 w-8" />
                },
                {
                  step: "4",
                  title: "Share & Collaborate",
                  description: "Invite travel companions to view and edit the itinerary. Everyone stays on the same page.",
                  icon: <Users className="h-8 w-8" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row ${index !== 3 ? 'mb-12' : ''}`}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4 md:mb-0 md:mr-8">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="mr-3 text-blue-600">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 pl-11">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing isLoggedIn={isLoggedIn} />

        {/* FAQ Section */}
        <FAQ />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to plan your next adventure?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of travelers who plan better trips with TripPlanner.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <AuthButton
                isLoggedIn={isLoggedIn}
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started for Free"}
              </AuthButton>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Examples</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} TripPlanner. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
