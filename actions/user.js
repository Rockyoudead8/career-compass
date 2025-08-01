"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AIInsights } from "@/actions/dashboard"; // ✅ Make sure this path is correct

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  try {
    const insights = await AIInsights(data.industry);
    const result = await db.$transaction(async (tx) => {
      let industryInsight = await tx.industryInsights.findUnique({
        where: { industry: data.industry },
      });

      if (!industryInsight) {
        industryInsight = await tx.industryInsights.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    }, { timeout: 10000 });

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function fetchOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    return { isAuthenticated: false, isOnboarded: false };
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  if (!user) {
    return { isAuthenticated: true, isOnboarded: false };
  }

  return {
    isAuthenticated: true,
    isOnboarded: !!user.industry,
  };
}

