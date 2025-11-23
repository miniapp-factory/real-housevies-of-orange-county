'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Question = {
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    text: "What’s your go-to weekend activity?",
    options: [
      "Sipping coffee at a quiet café",
      "Hosting a brunch with friends",
      "Spending time on social media and gossip",
      "Planning a big event or party",
    ],
  },
  {
    text: "How do you handle drama?",
    options: [
      "Avoid it entirely",
      "Talk it out with friends",
      "React loudly and share it",
      "Own it and lead the conversation",
    ],
  },
  {
    text: "What’s your signature style?",
    options: [
      "Casual and comfortable",
      "Chic and trendy",
      "Glamorous and bold",
      "High‑fashion and statement",
    ],
  },
  {
    text: "How do you celebrate success?",
    options: [
      "A quiet toast with coffee",
      "A sunny patio party",
      "A dramatic reveal on social media",
      "A grand celebration with champagne",
    ],
  },
  {
    text: "What’s your favorite accessory?",
    options: [
      "Sunglasses",
      "Cute dress",
      "Statement jewelry",
      "Big hair and a crown",
    ],
  },
];

const tiers = [
  {
    name: "Chill Newport Neighbor",
    image: "/chill-newport-neighbor.png",
    description:
      "Low drama, low glam, laid‑back vibes. You’re the calm, coffee‑loving neighbor.",
  },
  {
    name: "Casual Brunch Bestie",
    image: "/casual-brunch-bestie.png",
    description:
      "Social, fun, mild drama. You love brunches, mimosa, and sunny patio chats.",
  },
  {
    name: "Confessional Queen",
    image: "/confessional-queen.png",
    description:
      "Big opinions, glam, loves a storyline. You’re the talk‑show star of the neighborhood.",
  },
  {
    name: "Ultimate OC Housewife",
    image: "/ultimate-oc-housewife.png",
    description:
      "Maximum glam, drama, leadership vibes. You’re the queen of the OC scene.",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState<Question[]>([]);

  useEffect(() => {
    setShuffled(
      questions.map((q) => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5),
      }))
    );
  }, []);

  const handleAnswer = (option: string) => {
    setAnswers([...answers, option]);
    if (current + 1 < shuffled.length) {
      setCurrent(current + 1);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setShuffled(
      questions.map((q) => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5),
      }))
    );
  };

  const calculateTier = () => {
    const score = answers.length;
    if (score === 0) return null;
    const tierIndex = Math.min(Math.floor((score - 1) / 1), tiers.length - 1);
    return tiers[tierIndex];
  };

  const tier = calculateTier();

  if (tier) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">{tier.name}</h2>
        <img
          src={tier.image}
          alt={tier.name}
          width={512}
          height={512}
          className="rounded-md"
        />
        <p className="text-center max-w-md">{tier.description}</p>
        <Button onClick={resetQuiz}>Retake Quiz</Button>
        <Share
          text={`I just discovered I'm a ${tier.name}! ${url}`}
        />
      </div>
    );
  }

  const question = shuffled[current];
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      {question.options.map((opt) => (
        <Button
          key={opt}
          variant="outline"
          onClick={() => handleAnswer(opt)}
          className="w-full max-w-xs"
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}
