'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/logo.jpg" alt="CFA Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
              <div className="ml-3 sm:ml-4">
                <h1 className="text-base sm:text-xl font-bold text-gray-800">Chamber of Food & Agriculture</h1>
                <p className="text-xs sm:text-sm text-gray-600">Pakistan</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">About</a>
              <a href="#mission" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Mission</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Services</a>
              <Link href="/membership" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 font-semibold transition-all shadow-md hover:shadow-lg">
                Become a Member
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md">About</a>
              <a href="#mission" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md">Mission</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md">Services</a>
              <Link href="/membership" className="block mx-4 text-center bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 font-semibold">
                Become a Member
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 py-16 sm:py-24 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:-mt-16">
            <div className="mb-8 flex justify-center">
              <img src="/logo.jpg" alt="CFA Logo" className="h-32 w-32 sm:h-40 sm:w-40 object-contain animate-fade-in" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Empowering Farmers,<br className="hidden sm:block" /> Feeding the Future
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Connecting industry leaders for a sustainable future in agriculture and food production
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Link href="/membership" className="bg-green-600 text-white px-8 py-3.5 rounded-lg hover:bg-green-700 font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Become a Member
              </Link>
              <a href="#about" className="bg-white text-green-600 border-2 border-green-600 px-8 py-3.5 rounded-lg hover:bg-green-50 font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">About CFA</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              Chamber of Food and Agriculture is a platform that unites farmers, agribusinesses, industry experts, 
              and stakeholders to promote sustainable agriculture, food security, and market development. We work to 
              support innovation, enhance productivity, strengthen value chains, and create better opportunities for 
              the agriculture and food sector.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🎯</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                To act as a national resource center, think tank, and global platform for facilitating partnerships, 
                driving policy advocacy, and fostering entrepreneurship in the food and agriculture sectors. CFA aims 
                to empower farmers, enhance the agricultural value chain, and contribute to the economic ecosystem by 
                creating opportunities for trade, technology adoption, and sustainable agricultural development.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🔭</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our vision is to build a modern, sustainable, and prosperous agriculture sector in Pakistan. We aim to 
                empower farmers, encourage innovation, and strengthen the entire food and agriculture value chain. By 
                promoting technology adoption, improving productivity, and ensuring food security, we strive to make 
                agriculture more profitable, competitive, and capable of meeting the needs of future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">What We Offer</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🌾</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Support Local Growers</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We advocate for local farmers and food producers to enhance sustainability and drive economic growth 
                across Pakistan.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Innovate Agritech</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We promote cutting-edge agritech innovations to improve productivity and efficiency in the agriculture 
                sector.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🌍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Global Markets</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Connecting local producers to international market opportunities and resources for sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Categories */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Membership Plans</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Choose the membership that best fits your needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-green-500 transition-all">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">Rs. 2,000</div>
              <p className="text-sm sm:text-base text-gray-600">Perfect for individual farmers</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-green-300 hover:border-green-500 transition-all">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Associate</h3>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">Rs. 5,000</div>
              <p className="text-sm sm:text-base text-gray-600">For small businesses</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-blue-300 hover:border-blue-500 transition-all">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Executive</h3>
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Rs. 5,000</div>
              <p className="text-sm sm:text-base text-gray-600">For professionals</p>
            </div> 
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-yellow-300 hover:border-yellow-500 transition-all">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Corporate</h3>
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4">Rs. 30,000</div>
              <p className="text-sm sm:text-base text-gray-600">For large organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Join Us?</h2>
          <p className="text-base sm:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Become a member of the Chamber of Food & Agriculture and be part of Pakistan's agricultural transformation
          </p>
          <Link href="/membership" className="inline-block bg-white text-green-600 px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg sm:text-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            Apply for Membership →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.jpg" alt="CFA Logo" className="h-12 w-12 object-contain" />
                <div className="ml-3">
                  <h3 className="text-lg font-bold">CFA Pakistan</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Empowering agriculture for a sustainable future
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@cfapak.org</li>
                <li>Phone: +92 XXX XXXXXXX</li>
                <li>Address: Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-sm text-gray-400">© 2026 Chamber of Food & Agriculture Pakistan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
