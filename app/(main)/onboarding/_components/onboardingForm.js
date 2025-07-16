"use client"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema } from "@/app/lib/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useFetch from "@/hooks/use-fetch"
import { updateUser } from "@/actions/user"
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const router = useRouter();
  const { data: updateResult,
    fn: updateUserFn,
    loading: updateLoading } = useFetch(updateUser)




  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  })



  const selected = watch("industry")

  const onsubmit = async (values) => {

    try {
      const formattedIndustry = `${values.industry} - ${values.subIndustry.toLowerCase().replace(/ /g, '-')}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("onBoarding error:", error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-xl p-6">
        <CardHeader>
          <CardTitle className="gradient-background text-3xl md:text-4xl text-center animate-bounce">
            Complete your Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg text-center">
            Select your industry to get personalized career insights and recommendations
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-6">

              {/* Industry Select */}
              <div>
                <label htmlFor="industry">Industry</label>
                <div className="w-full">
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedIndustry(
                            industries.find((industry) => industry.id === value)
                          )
                        }}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select an Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem value={industry.id} key={industry.id}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sub-Industry */}
              {selected && selectedIndustry && (
                <div>
                  <label htmlFor="subIndustries">Sub-Industry</label>
                  <div className="w-full">
                    <Controller
                      name="subIndustry"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="subIndustries">
                            <SelectValue placeholder="Select a Sub-Industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedIndustry.subIndustries.map((sub) => (
                              <SelectItem value={sub} key={sub}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.subIndustry && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subIndustry.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Experience */}
              <div>
                <label htmlFor="experience">Years Of Experience</label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="Enter years of experience"
                  {...register("experience")}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills">Skills</label>
                <Input
                  id="skills"
                  placeholder="e.g., Python, React, Node.js"
                  {...register("skills")}
                />
                <p className="text-muted-foreground text-sm">
                  Enter comma-separated skills
                </p>
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.skills.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio">Professional Bio</label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="text-xl" disabled={updateLoading}>
                {updateLoading ? (

                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    saving...
                  </>
                ) : ("complete Profile")
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnboardingForm
