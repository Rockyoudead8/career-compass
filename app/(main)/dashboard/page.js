import { fetchOnboardingStatus } from '@/actions/user';
import { getIndustryInsights } from '@/actions/dashboard';
import DashboardView from './_components/DashboardView';
import Link from 'next/link';

export default async function DashboardPage() {
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

  if (!isOnboarded) {
    // Server-side redirect to onboarding
    return redirect('/onboarding');
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}
