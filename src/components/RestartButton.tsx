import { MdRefresh } from "react-icons/md";
import { useRef } from "react";
const RestartButton = ({
  onRestart: handleRestart,
  className = "",
}: {
  // REMEMBER: ? means optional
  onRestart: () => void;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`block rounded px-8 py-2 hover:bg-slate-900 ${className} hover:border-yellow-300 text-slate-300 hover:text-yellow-300`}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};

export default RestartButton;
