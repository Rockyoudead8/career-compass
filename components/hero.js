"use client"
import React, { use } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const Hero = () => {
  const router = useRouter();
  const ref = useRef(null);
  useEffect(() => {
    const heroImage = ref.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold && heroImage) {
        heroImage.classList.add("scrolled");
      } else if (heroImage) {
        heroImage.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div className='space-y-6 text-center'>
        <div className="space-y-6 mx-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold z-50 relative">
            Your AI Career Compass For
            <br />
            Proffessional Growth
          </h1>
          <div className='container mx-auto'><p className='text-xl italic'><b>Navigating career choices can be overwhelming—but it doesn't have to be. Our platform leverages the power of artificial intelligence to help you identify the career path that aligns with your skills, interests, and goals. Whether you're a student, a recent graduate, or considering a career switch, our AI-driven guidance provides personalized insights and recommendations to help you make confident, informed decisions about your future. Let technology be your compass on the journey to professional growth and success.</b></p></div>
        </div>
        <div className='gap-10 flex mx-auto justify-center items-center'>
          <div>
            <Link href={"/dashboard"} className="mt-6 ">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="flex justify-end gap-4 items-center">
            <Button
              onClick={() => router.push("/profile")}
              size="lg" className="px-8"
            >
              My Profile
            </Button>


          </div>
        </div>
        <div className='hero-image-wrapper mt-5 md:mt-0'>
          <div ref={ref} className='hero-image contain-content rounded'>
            <Image src={"/website-banner.png"} width={1280}
              height={1} alt='website-banner' className='mx-auto conatiner pt-10 pb-10 h-[50%] '></Image>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
