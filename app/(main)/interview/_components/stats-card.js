import React from 'react'
import { Brain, Briefcase, TrendingUp, TargetIcon, TrophyIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const statsCard = ({ assessments }) => {
    const getAverageScore = () => {
        if (!assessments?.length) return 0;
        const total = assessments.reduce(
            (Sum, assessment) => Sum + assessment.quizScore, 0
        );
        return (total / assessments.length).toFixed(1);
    };

    const getLatestAssessment = () => {
        if (!assessments?.length) return null;
        let ind = assessments.length - 1;
        return assessments[ind];
    }
    const getTotalQuestions = () => {
        if (!assessments?.length) return 0;
        return assessments.reduce((sum, assessment) => sum + assessment.questions.length, 0);
    };

    let averageScore = getAverageScore();
    let latestScore = getLatestAssessment();
    let quesPractised = getTotalQuestions();
    return (

        <div className='grid grid-cols-3 gap-8 pt-10'>
            <Card>
                <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                    <CardTitle className="text-m
                                    font-2xl">Average Score</CardTitle>
                    <TrophyIcon className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <p className='font-bold text-4xl'>{averageScore}%</p>
                    <p className='text-muted-foreground'>Across All Assessments</p>
                </CardContent>


            </Card>

            <Card>
                <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                    <CardTitle className="text-m
                                    font-2xl">Questions Practised</CardTitle>
                    <Brain className='h-4 w-4' />
                </CardHeader>
                <CardContent>
                    <p className='font-bold text-4xl'>{quesPractised}</p>
                    <p className='text-muted-foreground'>Total Questions</p>

                </CardContent>


            </Card>

            <Card>
                <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                    <CardTitle className="text-m
                                    font-2xl">Latest Score</CardTitle>
                    <TargetIcon className='h-4 w-4' />
                </CardHeader>
                <CardContent>
                    <p className='font-bold text-4xl'>{(latestScore?.quizScore?.toFixed(1)) ?? 'N/A'}%</p>
                    <p className='text-muted-foreground'>Most Latest Score</p>

                </CardContent>


            </Card>


        </div>

    )
}

export default statsCard
