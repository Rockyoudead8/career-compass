"use server";
import { getResume } from '@/actions/resume';
import React from 'react'
import ResumeBuilder from './_components/resume-builder';
import { fetchOnboardingStatus } from '@/actions/user';
import Link from 'next/link';
const Resume = async () => {
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
  const resume = await getResume();

  return (
    <div>
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  )
}

export default Resume
