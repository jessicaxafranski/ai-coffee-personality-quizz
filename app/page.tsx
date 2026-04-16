'use client';

import { useState } from 'react';
import QuizQuestion from './components/QuizQuestion';
import Results from './components/Results';

const QUESTIONS = [
  {
    text: "What's your ideal morning routine?",
    options: [
      { text: 'Wake up early & hit the gym before work', icon: '☀️', personality: 'healthNut' },
      { text: 'Sleep in, then have a slow breakfast', icon: '🛌', personality: 'zenMinimalist' },
      { text: 'Jump out of bed, ready to tackle the day', icon: '🚀', personality: 'boldAdventurer' },
      { text: 'Wake up naturally, take your time', icon: '🧘', personality: 'zenMinimalist' },
    ],
  },
  {
    text: 'Your ideal vacation is:',
    options: [
      { text: 'Exploring a new city with friends', icon: '🌍', personality: 'socialButterfly' },
      { text: 'A solo retreat somewhere peaceful', icon: '🏔️', personality: 'zenMinimalist' },
      { text: 'An adrenaline-fueled adventure', icon: '🪂', personality: 'boldAdventurer' },
      { text: 'A cozy cabin in the mountains', icon: '🏠', personality: 'socialButterfly' },
    ],
  },
  {
    text: 'How do you spend your downtime?',
    options: [
      { text: 'Trying new activities & pushing boundaries', icon: '🎯', personality: 'boldAdventurer' },
      { text: 'Relaxing at home with a good book', icon: '📚', personality: 'zenMinimalist' },
      { text: 'Meeting up with friends', icon: '👫', personality: 'socialButterfly' },
      { text: 'Meditating or yoga', icon: '🧘‍♀️', personality: 'healthNut' },
    ],
  },
  {
    text: 'Your work style is:',
    options: [
      { text: 'Structured & intentional', icon: '📐', personality: 'zenMinimalist' },
      { text: 'Fast-paced & go with the flow', icon: '⚡', personality: 'boldAdventurer' },
      { text: 'Comfortable & familiar processes', icon: '😌', personality: 'socialButterfly' },
      { text: 'Optimized for health & wellness', icon: '💚', personality: 'healthNut' },
    ],
  },
  {
    text: 'What matters most to you?',
    options: [
      { text: 'Meaningful connections with people', icon: '🤝', personality: 'socialButterfly' },
      { text: 'Peace & simplicity', icon: '☮️', personality: 'zenMinimalist' },
      { text: 'Getting the most out of life', icon: '🔥', personality: 'boldAdventurer' },
      { text: 'Balance & well-being', icon: '⚖️', personality: 'healthNut' },
    ],
  },
];

const PERSONALITIES = {
  boldAdventurer: {
    name: 'Bold Adventurer',
    coffee: 'Double Espresso',
    tagline: 'You live for intensity',
    icon: '⚡',
  },
  zenMinimalist: {
    name: 'Zen Minimalist',
    coffee: 'Black Coffee, Single Origin',
    tagline: 'Simple. Clean. Perfect.',
    icon: '☮️',
  },
  socialButterfly: {
    name: 'Social Butterfly',
    coffee: 'Cappuccino',
    tagline: 'Coffee is better with company',
    icon: '👥',
  },
  healthNut: {
    name: 'Health Nut',
    coffee: 'Oat Milk Americano',
    tagline: 'Wellness in every sip',
    icon: '💪',
  },
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({
    boldAdventurer: 0,
    zenMinimalist: 0,
    socialButterfly: 0,
    healthNut: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (personality: string) => {
    setAnswers((prev) => ({
      ...prev,
      [personality]: prev[personality] + 1,
    }));

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({
      boldAdventurer: 0,
      zenMinimalist: 0,
      socialButterfly: 0,
      healthNut: 0,
    });
    setIsComplete(false);
  };

  if (isComplete) {
    const totalAnswers = Object.values(answers).reduce((a, b) => a + b, 0);
    const results = Object.entries(answers).map(([key, count]) => {
      const personality = PERSONALITIES[key as keyof typeof PERSONALITIES];
      return {
        personality: personality.name,
        coffee: personality.coffee,
        tagline: personality.tagline,
        icon: personality.icon,
        percentage: Math.round((count / totalAnswers) * 100),
      };
    });

    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <Results results={results} onRestart={handleRestart} />
      </main>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl mb-8">
        {/* Quiz Title */}
        <h1 className="text-4xl font-bold text-center mb-2">What's Your Coffee?</h1>
        <p className="text-center text-accent-taupe text-sm mb-8 italic">5 questions about your life → 1 coffee that gets you</p>

        <div className="mb-6">
          <p className="text-center text-accent-taupe">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </p>
          <div className="w-full bg-accent-light rounded-full h-2 mt-2">
            <div
              className="h-full bg-accent-gold rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <QuizQuestion
        question={question.text}
        options={question.options}
        onAnswer={handleAnswer}
      />
    </main>
  );
}
