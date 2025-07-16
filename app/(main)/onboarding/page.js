import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboardingForm'
import { fetchOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
const onboarding = async () => {

  const { isOnboarded } = await fetchOnboardingStatus();
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
