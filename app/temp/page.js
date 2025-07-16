"use client"
import React from 'react'
import { format } from 'date-fns'
import { formatDistanceToNow } from 'date-fns'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge"
import { Brain, Briefcase, TrendingUp } from 'lucide-react'
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
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    //   const salaryData = insights.salaryRanges.map((range) => ({
    //     name: range.role,
    //     min: range.min / 1000,
    //     max: range.max / 1000,
    //     median: range.median / 1000,
    //   }))

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

    //   const getMarketOutlookInfo = (outlook) => {
    //     switch (outlook.toLowerCase()) {
    //       case "positive":
    //         return { icon: TrendingUp, color: "text-green-500" };
    //       case "neutral":
    //         return { icon: LineChart, color: "text-yellow-500" };
    //       case "negative":
    //         return { icon: TrendingDown, color: "text-red-500" };
    //       default:
    //         return { icon: LineChart, color: "text-gray-500" };
    //     }
    //   };
    //   const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    //   const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

    // Format dates using date-fns
    //   const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
    //   const nextUpdateDistance = formatDistanceToNow(
    //     new Date(insights.nextUpdate),
    //     { addSuffix: true }
    //   );
    return (
        <div className='p-10 mx-auto'>
            <div className='flex justify-between items-center'>
                <Badge variant="outline">Last Updated :</Badge>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Card>
                    <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="text-m
                        font-2xl">Market Outlook</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <p className='font-bold text-4xl'>Positive</p>
                    </CardContent>

                </Card>

                <Card>
                    <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="text-m
                        font-2xl">Progress</CardTitle>
                        <TrendingUp className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <p className='font-bold text-4xl'>Positive</p>
                        <Progress value={20} />

                    </CardContent>

                </Card>

                <Card>
                    <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="text-m
                        font-2xl">Demand Level</CardTitle>
                        <Briefcase></Briefcase>
                    </CardHeader>
                    <CardContent>
                        <p className='font-bold text-4xl'>Positive</p>
                    </CardContent>

                </Card>

                <Card>
                    <CardHeader className=" px-4 py-2 flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="text-m
                        font-2xl">Top Skills</CardTitle>
                        <Brain />
                    </CardHeader>
                    <CardContent>
                        <p className='font-bold text-4xl'>Positive</p>
                    </CardContent>

                </Card>
            </div>
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
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />

                                    <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>

                </Card>
            </div>

            <div className='grid grid-cols-2 pt-10 gap-10 h-[50vh]'>
                <Card>
                    <div>
                        <CardHeader >
                            <CardTitle className="text-2xl">
                                Key Industry Trend</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <p className='font-bold text-sm text-muted-foreground'>Trends that are going over the roof</p>
                        </CardContent>
                    </div>

                </Card>

                <Card>
                    <div>
                        <CardHeader >
                            <CardTitle className="text-2xl">
                                Recommeded Skills</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <p className='font-bold text-sm text-muted-foreground'>Skills To Consider Developing</p>
                        </CardContent>
                    </div>

                </Card>
            </div>


        </div>

    )
}

export default DashboardView
