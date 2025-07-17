import React from 'react';
import HeroSection from "@/components/hero.js";
import features from "@/data/features.js";
import howItWorks from '@/data/howItWorks';
import faqs from '@/data/faqs';
import testimonial from '@/data/testimonial';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export default function Home() {
  return (

    <>
      <div className="grid-background">
      </div>
      <HeroSection />
      <section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 space-y-10'>
          <h2 className='text-3xl font-bold tracking-tighter text-center mb-20'>Powerful Features for your Career Growth</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mx-auto max-w-6xl gap-5'>

            <Card className="border-2 hover:border-primary transition-colors duration-300" key={0}>

              <CardContent className="font-bold text-center">
                <Link href="/onboarding"><div className='flex items-center justify-center flex-col'>{features[0].icon}
                  <h3>
                    {features[0].title}
                  </h3>
                  <br />

                  <br />
                  <p className='text-muted-foreground'>{features[0].description}</p>
                </div></Link>
              </CardContent>

            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300" key={1}>

              <CardContent className="font-bold text-center">
                <Link href="/interview"><div className='flex items-center justify-center flex-col'>{features[1].icon}
                  <h3>
                    {features[1].title}
                  </h3>
                  <br />

                  <br />
                  <p className='text-muted-foreground'>{features[1].description}</p>
                </div></Link>
              </CardContent>

            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300" key={2}>

              <CardContent className="font-bold text-center">
                <Link href="/dashboard"><div className='flex items-center justify-center flex-col'>{features[2].icon}
                  <h3>
                    {features[2].title}
                  </h3>
                  <br />

                  <br />
                  <p className='text-muted-foreground'>{features[2].description}</p>
                </div></Link>
              </CardContent>

            </Card>

            <Card className="border-2 hover:border-primary transition-colors duration-300" key={3}>

              <CardContent className="font-bold text-center">
                <Link href="/resume"><div className='flex items-center justify-center flex-col'>{features[3].icon}
                  <h3>
                    {features[3].title}
                  </h3>
                  <br />

                  <br />
                  <p className='text-muted-foreground'>{features[3].description}</p>
                </div></Link>
              </CardContent>

            </Card>

          </div>
        </div>
      </section>

      <section className='w-full py-12 md:py-24 lg:py-32 bg-background mt-15'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 space-y-10'>
          <h2 className='text-3xl font-bold tracking-tighter text-center mb-20'>How Does It Works</h2>
          <Carousel>
            <CarouselContent className="-ml-4">

              {howItWorks.map((item, index) => (
                <CarouselItem className="pl-4" key={index}>
                  <div className='p-1'>
                    <Card className="border-2 hover:border-primary transition-colors duration-300">
                      <CardContent className="font-bold text-center">
                        <div className='flex items-center justify-center flex-col'>
                          {item.icon}
                          <h3>{item.title}</h3>
                          <br />
                          <p className='text-muted-foreground'>{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>
      </section>

      <section className='w-full py-12 md:py-24 lg:py-32 bg-background mt-15'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 '>
          <h2 className='text-3xl font-bold tracking-tighter text-center mb-20'>Some Testimonials</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mx-auto max-w-6xl'>

            {testimonial.map((item, index) => (
              <Card className="border-2 hover:border-primary transition-colors duration-300" key={index}>
                <CardContent className="font-bold text-center">
                  <div className='flex items-center justify-center flex-col'>
                    <Image src={item.image} width={40} height={40} className='rounded-full'></Image>
                    <h3>{item.author}</h3>
                    <br />
                    <p className='italic text-sm'>{item.role} at {item.company}</p>
                    <blockquote className="italic text-muted-foreground mt-4 text-base leading-relaxed">
                      “{item.quote}”
                    </blockquote>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className='w-full py-12 md:py-24 lg:py-32 bg-background mt-15'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 space-y-10'>
          <h2 className='text-3xl font-bold tracking-tighter text-center mb-20'>Frequently Asked Questions</h2>
          <div className='grid grid-rows-2 gap-6 max-w-6xl mx-auto md:grid-rows-3 lg:grid-rows-6'>{faqs.map((faq, index) => {
            return (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" key={index} className="border-3 border-gray-200 rounded-md p-4">
                  <AccordionTrigger className="font-bold text-lg md:text-xl lg:text-2xl">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-bold text-lg md:text-xl lg:text-2xl">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
          </div>
        </div>
      </section>

      <section className='w-full py-12 md:py-24 lg:py-32 bg-background mt-15 gradient-background mb-10'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 space-y-10'>
          <h2 className='text-6xl font-bold tracking-tighter text-center mb-20'>Ready To Fly ?</h2>
          <p className='font-bold text-center text-3xl mx-auto max-w-6xl'>Join Thousands of proffessionals who are advancing their careers by using the help of Career Campus </p>
        </div>
        <div className='flex justify-center'>
          <Link href="/dashboard"><Button className="mt-10 text-3xl animate-bounce">Get Started !!!</Button></Link>
        </div>


      </section>
    </>

  );
}
