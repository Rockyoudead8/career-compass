
import React from 'react'
import { TrophyIcon } from 'lucide-react'
import { getAssessments } from '@/actions/interview'
import StatsCard from './_components/stats-card'
import PerformanceChart from './_components/performance-chart'
import QuizList from './_components/quiz-list'
const interview = async () => {

  const assessments = await getAssessments();
  return (
    <div>
      <div>
        <h1 className='font-bold text-6xl'>INTERVIEW INSIGHTS</h1>
      </div>

      <div className='space-y-10 pb-10'>
        <StatsCard assessments={assessments}></StatsCard>
        <PerformanceChart assessments={assessments}/>
        <QuizList assessments={assessments}/>
      </div>
    </div>

  )
}

export default interview
