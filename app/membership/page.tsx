'use client';

import Link from 'next/link';
import MembershipForm from '@/components/MembershipForm';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/home" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="CFA Logo" className="h-10 w-10 object-contain" />
              <div>
                <p className="text-sm font-bold text-gray-800 leading-none">CFA Pakistan</p>
                <p className="text-xs text-gray-500">Chamber of Food & Agriculture</p>
              </div>
            </Link>
            <Link
              href="/home"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Membership Application</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Fill in the form below and download your completed membership form
          </p>
        </div>
        <MembershipForm />
      </div>
    </div>
  );
}
