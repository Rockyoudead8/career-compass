"use client"
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceChart = ({ assessments }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const formattedData = assessments.map((assessment) => ({
      date: format(new Date(assessment.createdAt), 'MMM d, yyyy'),
      score: Number(assessment.quizScore),
    }));
    setChartData(formattedData);
  }, [assessments]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>Your quiz score over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload.length) {
                  return (
                    <div className='bg-background p-2 rounded-md'>
                      <p className='text-sm font-medium'>Score : {payload[0].value.toFixed(2)}%</p>
                      <p className='text-sm text-muted-foreground'>{payload[0].payload.date}</p>
                    </div>
                  )
                }
              }} />

              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default performanceChart
