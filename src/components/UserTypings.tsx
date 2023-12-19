import classNames from "classnames";
import Caret from "./Caret";

const UserTypings = ({
  userInput,
  className,
  words,
}: {
  className?: string;
  words: string;
  userInput: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}_${index}`}
            actual={char}
            expected={words[index]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";
  return (
    <span
      //* Use classNames to conditionally apply classes
      className={classNames({
        "text-primary-400": isCorrect && !isWhiteSpace,
        "text-red-500": !isCorrect && !isWhiteSpace,
        //! Whitespace yerine karaktere basarsan:
        "bg-red-500/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};
export default UserTypings;
