import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
    { name: "Generate Industry Insights" },
    { cron: "0 0 * * 0" }, // Run every Sunday at midnight
    async ({ event, step }) => {
        const industries = await step.run("Fetch industries", async () => {
            const result = await db.IndustryInsights.findMany({
                select: { industry: true },
            });
            console.log("fetched industries", result);
            return result;
        });

        for (const { industry } of industries) {
            console.log("Processing industry:", industry);

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

            const res = await step.ai.wrap(
                "gemini",
                async (p) => {
                    return await model.generateContent(p);
                },
                prompt
            );

            const text = res.response.candidates[0].content.parts[0].text || "";
            console.log("Raw Gemini output:", text);
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

            const insights = JSON.parse(cleanedText);

            await step.run(`Update ${industry} insights`, async () => {
                await db.IndustryInsights.upsert({
                    where: { industry },
                    update: {
                        ...insights,
                        lastUpdated: new Date(),
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                    create: {
                        industry,
                        ...insights,
                        lastUpdated: new Date(),
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
            });
        }
    }
);