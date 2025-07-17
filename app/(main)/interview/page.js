
import React from 'react'
import { TrophyIcon } from 'lucide-react'
import { getAssessments } from '@/actions/interview'
import StatsCard from './_components/stats-card'
import PerformanceChart from './_components/performance-chart'
import QuizList from './_components/quiz-list'
import { fetchOnboardingStatus } from '@/actions/user'
import Link from 'next/link'
const interview = async () => {
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
  const assessments = await getAssessments();
  return (
    <div>
      <div>
        <h1 className='font-bold text-6xl'>INTERVIEW INSIGHTS</h1>
      </div>

      <div className='space-y-10 pb-10'>
        <StatsCard assessments={assessments}></StatsCard>
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>

  )
}

export default interview
