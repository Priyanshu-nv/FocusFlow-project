import React from "react";
import { Trash2 } from "lucide-react";

const HabitList = ({ habits, toggleHabit, deleteHabit }) => {
  return (
    <div className="space-y-3">
      {habits.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base">
          No habits yet
        </p>
      ) : (
        habits.map((habit) => (
          <div
            key={habit.id}
            onClick={() => {
              toggleHabit(habit.id);
              console.log("clicked");
            }}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition duration-200  ${habit.completed ? "bg-green-100 border-green-300" : "bg-gray-50 hover:bg-gray-400"}`}
          >
            <span
              title={habit.text}
              className={`flex-1 text-gray-800 wrap-break-word line-clamp-2 ${
                habit.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {habit.text}
            </span>
            <span className="mr-2">{habit.completed ? "✅" : "⬜"}</span>
            <button
              className="text-gray-700 text-xs hover:text-gray-900 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteHabit(habit.id);
              }}
            >
              <Trash2 className="size-5.5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;
