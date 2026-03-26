import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="m-2 text-center">
      <h2 className="text-xl font-semibold mb-3">Focus Timer ⏱️</h2>

      <div className="text-4xl font-bold mb-4">{formatTime()}</div>

      <div className="flex justify-center gap-3 ">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 text-white cursor-pointer px-4 py-1 rounded-xl hover:bg-green-600"
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="bg-yellow-500 text-white cursor-pointer px-4 py-1 rounded-xl hover:bg-yellow-600"
        >
          Pause
        </button>

        <button
          onClick={() => {
            setSeconds(1500);
            setIsRunning(false);
          }}
          className="bg-red-500 text-white cursor-pointer px-4 py-1 rounded-xl hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
