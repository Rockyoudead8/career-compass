import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboardingForm'
import { fetchOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import Link from 'next/link';
const onboarding = async () => {

  const { isAuthenticated, isOnboarded } = await fetchOnboardingStatus();

  if (!isAuthenticated) {
    // Server-side fallback UI for unauthenticated users
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold mb-4">You're not signed in</h1>
        <p className="mb-4">Please <Link href="/sign-in" className="text-blue-600 underline">sign in</Link> to access your dashboard.</p>
      </div>
    );
  }




  if (isOnboarded) {
    redirect('/dashboard');
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default onboarding
