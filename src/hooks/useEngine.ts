import { useState, useCallback, useEffect } from "react";
import { countErrors } from "../utils/helpers";
import useCountdownTimer from "./useCountdownTimer";
import useWords from "./useWords";
import useTyping from "./useTypings";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);

  const { timeLeft, startCountdown } = useCountdownTimer(COUNTDOWN_SECONDS);
  const { resetCountDown } = useCountdownTimer(COUNTDOWN_SECONDS);

  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTyping(
    state !== "finish"
  );

  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;

  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // ! as soon the user starts typing the first letter, we start:
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  // ! when the timer is over, we finish the game:
  useEffect(() => {
    if (!timeLeft) {
      console.log("Game over!");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  /*
   * When the current words are all filled up,
   * We generate and show another set of words!
   */

  useEffect(() => {
    if (areWordsFinished) {
      console.log("Words finished!");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

  const restart = useCallback(() => {
    console.log("Restarting...");
    resetCountDown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountDown, resetTotalTyped]);
  return { state, words, timeLeft, typed, totalTyped, errors, restart };
};

export default useEngine;
