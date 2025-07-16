"use client"
import React from 'react'
import { format } from 'date-fns'
import { formatDistanceToNow } from 'date-fns'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge"
import { Brain, Briefcase, TrendingUp, TrendingDown, LineChart, BriefcaseIcon } from 'lucide-react'
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

const DashboardView = ({ insights }) => {
    
    const salaryData = insights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000,
    }))

    const getDemandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-red-500";
            default:
                return "bg-gray-500"
        }
    };

    const getMarketOutlookInfo = (outlook) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" };
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" };
            case "negative":
                return { icon: TrendingDown, color: "text-red-500" };
            default:
                return { icon: LineChart, color: "text-gray-500" };
        }
    };
    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;


    const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
    const nextUpdateDistance = formatDistanceToNow(
        new Date(insights.nextUpdate),
        { addSuffix: true }
    );
    return (
        <div className='p-10 mx-auto'>
            <div className='flex justify-between items-center pb-10'>
                <Badge variant="outline" >Last Updated :{lastUpdatedDate}</Badge>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Card>
                    <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="text-m
                        font-2xl">Market Outlook</CardTitle>
                        <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className='font-bold text-3xl'>{insights.marketOutlook}</div>
                        <p className="text-xs text-muted-foreground">
                            Next update {nextUpdateDistance}
                        </p>
                    </CardContent>

                </Card>

                <Card>
                    <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="text-m
                        font-2xl">Industry Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {insights.growthRate.toFixed(1)}%
                        </div>
                        <Progress value={insights.growthRate} className="mt-2" />

                    </CardContent>

                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
                        <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{insights.demandLevel}</div>
                        <div
                            className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                                insights.demandLevel
                            )}`}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
                        <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-1">
                            {insights.topSkills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Salary Ranges */}
            <div className='w-full pt-10 '>
                <Card>
                    <CardHeader >
                        <CardTitle >Salray ranges by role</CardTitle>
                        <CardDescription>
                            Displaying minimum , median , and maximum salaries (in thousands)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='h-[50vh]'>
                            <ResponsiveContainer width="90%" height="100%" className="mx-auto">
                                <BarChart
                                    data={salaryData}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-background border rounded-lg p-2 shadow-md">
                                                        <p className="font-medium">{label}</p>
                                                        {payload.map((item) => (
                                                            <p key={item.name} className="text-sm">
                                                                {item.name}: ${item.value}K
                                                            </p>
                                                        ))}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                                    <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                                    <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>

                </Card>
            </div>
            <div className='font-bold text-3xl pt-10 '>Industry Trends</div>
            <div className='grid grid-cols-2 pt-10 gap-10 h-[50vh]'>
                <Card>
                    <div>
                        <CardHeader >
                            <CardTitle className="text-2xl">
                                Key Industry Trend</CardTitle>
                            <CardDescription>
                                Current trends shaping the industry
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-10">
                            <ul className="space-y-4">
                                {insights.keyTrends.map((trend, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                                        <span>{trend}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </div>

                </Card>

                <Card>
                    <div>
                        <CardHeader >
                            <CardTitle className="text-2xl">
                                Recommeded Skills</CardTitle>
                            <CardDescription>Skills to consider developing</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-10 ">
                            <div className="flex flex-wrap gap-5 justify-center h-20">
                                {insights.reccommendedSkills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="bg-background">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </div>

                </Card>
            </div>


        </div>

    )
}

export default DashboardView
