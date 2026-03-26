import { useContext, useEffect, useState } from "react";
import "./App.css";
import HabitInput from "./components/HabitInput";
import HabitList from "./components/HabitList";
import Timer from "./components/Timer";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (text) => {
    const newhabit = {
      id: Date.now(),
      text,
      completed: false,
    };
    setHabits([...habits, newhabit]);
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div
      className={`min-h-screen  flex items-center justify-center transition p-4 ${dark ? "bg-gray-900 text-white" : "bg-linear-to-br from-gray-100 to-gray-200 text-black"}`}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-xl transition ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold ">FocusFlow 🚀</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>

        <HabitInput habits={habits} addHabit={addHabit} />
        <HabitList
          habits={habits}
          toggleHabit={toggleHabit}
          deleteHabit={deleteHabit}
        />

        <div
          className={`${dark ? "bg-gray-600" : "bg-gray-300"} transition p-2 mt-6 rounded-xl`}
        >
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
