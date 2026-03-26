import React, { useEffect, useRef, useState } from "react";

const HabitInput = ({ addHabit, habits }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  let max_length = 20;

  const handleAdd = () => {
    const trimmed = text.trim();
    const isDuplicate = habits.some(
      (h) => h.text.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!trimmed) {
      setError("Habit cannot be empty!");
      return;
    }

    if (trimmed.length > max_length) {
      setError(`Max ${max_length} characters allowed`);
      return;
    }

    if (isDuplicate) {
      setError("Habit already exists");
      return;
    }

    addHabit(trimmed);
    setText("");
    setError("");
    inputRef.current.focus();
  };

  return (
    <div className="mb-4 sm:mb-5">
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          placeholder="Add habit..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-xl transition duration-200"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default HabitInput;
