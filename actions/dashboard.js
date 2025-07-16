"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function AIInsights(industry) {
    const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "reccommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Make sure the demand level and the marketOutlook should have all the letters capitilized.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

    for (let i = 0; i < 2; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            return JSON.parse(text.replace(/```(?:json)?\n?/g, "").trim());
        } catch (err) {
            if (i === 1) throw err;
            await new Promise(res => setTimeout(res, 1500)); // wait before retry
        }
    }
}

export async function getIndustryInsights() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: { industryInsights: true },
    });

    if (!user) throw new Error("User not found");

    if (!user.industry) {
        throw new Error("User industry not set");
    }

    if (!user.industryInsights) {
        const insights = await AIInsights(user.industry);

        const industryInsight = await db.industryInsights.upsert({
            where: { industry: user.industry },
            update: {
                ...insights,
                lastUpdated: new Date(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
            create: {
                industry: user.industry,
                ...insights,
                lastUpdated: new Date(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return industryInsight;
    }

    return user.industryInsights;
}

