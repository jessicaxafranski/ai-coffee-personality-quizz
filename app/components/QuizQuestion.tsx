interface QuestionOption {
  text: string;
  icon: string;
  personality: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuestionOption[];
  onAnswer: (personality: string) => void;
}

export default function QuizQuestion({
  question,
  options,
  onAnswer,
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{question}</h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.text}
            onClick={() => onAnswer(option.personality)}
            className="w-full p-4 text-left bg-accent-light hover:bg-accent-gold text-foreground rounded-lg transition-colors flex items-center gap-3"
          >
            <span className="text-2xl">{option.icon}</span>
            <span className="text-lg">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
