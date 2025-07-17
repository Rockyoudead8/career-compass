import React from 'react'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FileTerminal, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

const header = async () => {
  await checkUser();
  return (
    <header className='fixed top-0 w-full border-b backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 '>
      <nav className=' mx-auto flex items-center justify-between px-5 h-30 '>
        <Link href={'/'}>
          <Image src={"/logo.png"} alt="Career Compass Logo" width={100} height={100} className="cursor-pointer rounded-full  mt-5 ml-5 sm:ml-10 h-[100px] w-[100px]">
          </Image>
        </Link>
        <div className='flex items-center space-x-4 sm:space-x-6 '>
          <SignedIn>
            <div>
              <Link href={"/dashboard"}>
                <Button>
                  <LayoutDashboard className='h-4 w-4' />
                  Industry Insights
                </Button>
              </Link>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button>
                    <StarsIcon className='h-4 w-4' />
                    <span className='text-sm font-medium'>Growth Tools</span>
                    <ChevronDownIcon className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={"/resume"}>
                      <FileText className='h-4 w-4' />
                      <span className='text-sm font-medium'> Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem> <Link href={"/ai-cover-letter"}>
                    <PenBox className='h-4 w-4' />
                    <span className='text-sm font-medium'> Cover Letter</span>
                  </Link></DropdownMenuItem>
                  <DropdownMenuItem> <Link href={"/interview"}>
                    <GraduationCap className='h-4 w-4' />
                    <span className='text-sm font-medium'> Interview Prep</span>
                  </Link></DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-20 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                }
              }}
              afterSignOutUrl={'/'}
            />
          </SignedIn>
        </div>
      </nav>



    </header >
  )
}

export default header
