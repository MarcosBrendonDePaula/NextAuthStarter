'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaSave, FaSignOutAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { profileUpdateSchema, type ProfileUpdateInput } from '@/lib/validations';
import { useTheme } from '@/components/ThemeProvider';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const { theme } = useTheme();

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  // Pre-populate with user data
  const defaultUserData = {
    firstName: 'marcos',
    lastName: 'brendon',
    email: 'n@gmail.com',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: session?.user?.firstName || defaultUserData.firstName,
      lastName: session?.user?.lastName || defaultUserData.lastName,
      email: session?.user?.email || defaultUserData.email,
    },
  });

  const onSubmit = async (data: ProfileUpdateInput) => {
    try {
      setIsLoading(true);
      setMessage(null);

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: result.message || 'Failed to update profile' });
        return;
      }

      // Update the session with new user data
      await update({
        ...session,
        user: {
          ...session?.user,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        },
      });

      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-400 dark:bg-blue-600 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-400 dark:bg-blue-600 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-400 dark:bg-blue-600 rounded"></div>
              <div className="h-4 bg-blue-400 dark:bg-blue-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const getInitials = () => {
    const firstName = session?.user?.firstName || '';
    const lastName = session?.user?.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Generate random gradient for avatar background
  const getAvatarGradient = () => {
    const gradients = [
      'from-blue-500 to-purple-500',
      'from-green-400 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-yellow-400 to-red-500',
      'from-indigo-500 to-purple-500',
    ];
    
    // Use a hash of the user's name to get a consistent gradient
    const nameHash = (session?.user?.name || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[nameHash % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800"></div>
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center sm:space-x-6 -mt-16 sm:-mt-12">
            <div className={`h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br ${getAvatarGradient()} text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white dark:border-gray-800`}>
              {getInitials()}
            </div>
            <div className="mt-6 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{session?.user?.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start mt-1">
                <FaEnvelope className="mr-2" />
                {session?.user?.email}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification */}
        {message && (
          <div
            className={`p-4 rounded-lg shadow-md flex items-center ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-l-4 border-green-500' 
                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-l-4 border-red-500'
            }`}
          >
            {message.type === 'success' ? (
              <FaCheck className="mr-3 text-green-500 dark:text-green-400" />
            ) : (
              <FaTimes className="mr-3 text-red-500 dark:text-red-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Edit Profile Information</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    className={`pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm transition ${
                      errors.firstName ? 'border-red-300 dark:border-red-700' : ''
                    }`}
                    {...register('firstName')}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    className={`pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm transition ${
                      errors.lastName ? 'border-red-300 dark:border-red-700' : ''
                    }`}
                    {...register('lastName')}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm transition ${
                    errors.email ? 'border-red-300 dark:border-red-700' : ''
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !isDirty}
                className={`inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white 
                  ${isDirty ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 
                  disabled:opacity-50 transition-colors`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Section - Account Security */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Security</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage your account security settings and password.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            onClick={() => alert('Password change functionality would go here')}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
