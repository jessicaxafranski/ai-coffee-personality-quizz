interface ResultData {
  personality: string;
  coffee: string;
  tagline: string;
  icon: string;
  percentage: number;
}

interface ResultsProps {
  results: ResultData[];
  onRestart: () => void;
}

export default function Results({ results, onRestart }: ResultsProps) {
  const sorted = [...results].sort((a, b) => b.percentage - a.percentage);
  const topResult = sorted[0];
  const otherResults = sorted.slice(1);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-2 text-center">Your Results</h2>
      <p className="text-center text-accent-taupe mb-8">Here's your coffee personality breakdown:</p>

      {/* Top Result - Primary */}
      <div className="p-8 bg-gradient-to-br from-accent-light to-background rounded-lg border-2 border-accent-gold mb-6">
        <p className="text-center text-accent-taupe text-sm mb-4">☕ Your coffee match</p>
        <h3 className="text-5xl font-bold text-center mb-2 text-foreground">{topResult.coffee}</h3>
        <p className="text-center text-lg text-accent-taupe mb-4">The {topResult.personality}</p>
        <p className="text-center italic text-foreground mb-6">"{topResult.tagline}"</p>
        <div className="w-full bg-background rounded-full h-3 mb-2">
          <div
            className="h-full bg-accent-gold rounded-full transition-all"
            style={{ width: `${topResult.percentage}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-accent-taupe">{topResult.percentage}%</p>
      </div>

      {/* Other Results - Secondary */}
      {otherResults.length > 0 && (
        <div className="mb-8">
          <p className="text-center text-accent-taupe text-sm mb-4">Also in your mix:</p>
          <div className="space-y-3">
            {otherResults.map((result) => (
              <div
                key={result.personality}
                className="p-4 bg-accent-light rounded-lg flex items-center justify-between hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{result.icon}</span>
                  <div>
                    <p className="font-semibold">{result.coffee} — <span className="text-accent-taupe">The {result.personality}</span></p>
                  </div>
                </div>
                <span className="font-bold text-accent-gold">{result.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="w-full p-4 bg-accent-gold hover:bg-accent-taupe text-background font-bold rounded-lg transition-colors"
      >
        Take Quiz Again
      </button>
    </div>
  );
}
