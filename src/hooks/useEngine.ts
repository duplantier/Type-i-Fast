import { useState } from "react";

export type State = "start" | "run" | "finish";

const useEngine = () => {
  const [state, setState] = useState<State>("start");

  return { state };
};

export default useEngine;
