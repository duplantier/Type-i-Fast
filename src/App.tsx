import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

// Define the main application component
const App = () => {
  // Initialize state and variables using the useEngine hook
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();
  return (
    <>
      {/* Display a countdown timer */}
      <CountdownTimer timeLeft={timeLeft} />

      {/* Container for generated words */}
      <WordsContainer>
        {/* Display generated words */}
        <GeneratedWords words={words} />

        {/* Display user typings */}
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
        {/* User Input appears on top of generated words. Both have the same style. */}
      </WordsContainer>

      {/* Restart button */}
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />

      {/* Display results */}
      <Results
        state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </>
  );
};

//* Container component for words
const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-w-xl mt-3 text-3xl leading-relaxed break-all">
      {children}
    </div>
  );
};

//* Component for displaying generated words
const GeneratedWords = ({ words }: { words: string }) => {
  return <div className=" text-slate-500">{words}</div>;
};

//* Component for displaying countdown timer
const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft} </h2>;
};
export default App;
