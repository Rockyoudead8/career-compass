"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import useFetch from '@/hooks/use-fetch';
import { generateQuiz, saveQuizResult } from '@/actions/interview';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/label"
import QuizResult from './quiz-result';
import BarLoader from 'react-spinners/BarLoader';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from 'sonner';
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz)

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: SetResultData,
  } = useFetch(saveQuizResult)


  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null))
    }
  }, [quizData])

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  }



  if (generatingQuiz) {
    return (
      <div>
        <Loader2 className='w-4 h-4 animate-spin' />
      </div>
    )
  }

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    SetResultData(null);
  }

  if (resultData) {
    return (
      <div className='mx-2'>
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    )
  }

  if (!quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to take the quiz?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            This quiz contains 10 questions.Specific to your skills and experience.
          </p>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={() => generateQuizFn()}>Start Quiz</Button>
        </CardFooter>
      </Card>
    )
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      finishQuiz();
    }
  }

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        score++;
      }
    })
    return (score / quizData.length) * 100;
  }

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      const result = await saveQuizResultFn(quizData, answers, score);
      console.log(resultData);
      toast.success("Quiz result saved successfully");
    } catch (error) {
      console.error("failed to save quiz result", error);
    }


  }

  const question = quizData[currentQuestion];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions {currentQuestion + 1} of {quizData.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-lg font-medium'>
          {question.question}
        </p>

        <RadioGroup className='space-y-2' onValueChange={handleAnswer}
          value={answers[currentQuestion]}>
          {question.options.map((option, index) => {
            return (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            )
          })}
        </RadioGroup>
        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>

        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>

      </CardFooter>
    </Card>
  )
}

export default Quiz
