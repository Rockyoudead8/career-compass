import React from 'react';
import { fetchOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import { getIndustryInsights } from '@/actions/dashboard';
import DashboardView from './_components/DashboardView';

const dashboard = async () => {
  const { isOnboarded } = await fetchOnboardingStatus();

  if (!isOnboarded) {
    redirect('/onboarding');
  }


  const insights = await getIndustryInsights();

  return (
    <div className='container mx-auto'>
      <DashboardView insights={insights} />
    </div>
  );
};

export default dashboard;
