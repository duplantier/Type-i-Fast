import { clear } from "console";
import { useCallback, useEffect, useRef, useState } from "react";
const useCountdownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startCountdown = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  }, [setTimeLeft]);

  const resetCountDown = useCallback(() => {
    console.log("Resetting countdown...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!timeLeft && intervalRef.current) {
      console.log("Clearing timer...");

      clearInterval(intervalRef.current);
    }
  }, [timeLeft, intervalRef]);

  return { timeLeft, startCountdown, resetCountDown };
};

export default useCountdownTimer;
