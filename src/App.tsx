import { faker } from "@faker-js/faker";

const words = faker.random.words(10);

function App() {
  return (
    <>
      <CountdownTimer timeLeft={30} />
      <GeneratedWords words={words} />
    </>
  );
}

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="text-4xl text-slate-500">{words}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft} </h2>;
};
export default App;
