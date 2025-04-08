'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FaUserPlus, FaSignInAlt, FaUserCircle, FaDatabase, FaLock, FaUserShield } from "react-icons/fa";

export default function Home() {
  const { data: session, status } = useSession();
  
  // Pre-populate with user data if needed
  const defaultUserData = {
    firstName: '',
    lastName: '',
    email: '',
  };
  
  const userName = session?.user?.firstName || defaultUserData.firstName;

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block">NextAuth</span>
                <span className="block text-blue-200">Starter Template</span>
              </h1>
              <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                A complete authentication solution for Next.js applications with MongoDB integration.
                Get started quickly with user authentication, profile management, and more.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                {status === 'authenticated' ? (
                  <div className="rounded-md shadow">
                    <Link
                      href="/profile"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 md:py-4 md:text-lg md:px-10"
                    >
                      <FaUserCircle className="mr-2" />
                      View Your Profile
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-md shadow">
                      <Link
                        href="/auth/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 md:py-4 md:text-lg md:px-10"
                      >
                        <FaUserPlus className="mr-2" />
                        Sign Up
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <Link
                        href="/auth/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                      >
                        <FaSignInAlt className="mr-2" />
                        Sign In
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={500}
                    height={300}
                    className="w-full p-10"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <Image
                      src="/vercel.svg"
                      alt="Vercel Logo"
                      width={100}
                      height={100}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      {status === 'authenticated' && (
        <div className="bg-white dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Welcome Back</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Hello, {userName}!
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                You're logged in to your account. You can now access all the features of the application.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to get started
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              This template provides a solid foundation for building secure web applications with user authentication and MongoDB integration.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                  <FaUserShield className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Complete Authentication</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    User registration, login, and profile management with NextAuth.js. Secure password handling with bcrypt.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                  <FaDatabase className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">MongoDB Integration</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Mongoose ODM for MongoDB with Docker Compose setup for local development. User model with validation.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                  <FaLock className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Protected Routes</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Middleware for route protection. Only authenticated users can access protected routes.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Modern Development Stack</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Next.js with App Router, TypeScript, Tailwind CSS, Zod for validation, and React Hook Form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
