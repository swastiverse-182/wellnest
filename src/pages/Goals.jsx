import { useState, useEffect } from "react";
import goalsBg from "../assets/goalsBg.png";

function Goals() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("wellnest_goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [healthGoal, setHealthGoal] = useState("");
  const [workoutGoal, setWorkoutGoal] = useState("");

  useEffect(() => {
    localStorage.setItem("wellnest_goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (text, category) => {
    if (!text.trim()) return;

    setGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        category,
        completed: false,
      },
    ]);
  };

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 sm:py-16 px-4 sm:px-6 sm:bg-fixed"
      style={{ backgroundImage: `url(${goalsBg})` }}
    >
      {/* Main container */}
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-green-700 mb-8 sm:mb-12 text-center">
           Your Wellness Goals
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <GoalSection
            title="Health Goals"
            subtitle="Weight, sleep, hydration, habits"
            placeholder="Lose 2 kg, sleep 8 hours..."
            color="green"
            value={healthGoal}
            onChange={setHealthGoal}
            onAdd={() => {
              addGoal(healthGoal, "health");
              setHealthGoal("");
            }}
            goals={goals.filter((g) => g.category === "health")}
            onToggle={toggleGoal}
            onDelete={deleteGoal}
          />

          <GoalSection
            title="Workout Goals"
            subtitle="Strength, flexibility, endurance"
            placeholder="Build biceps, plank 2 mins..."
            color="blue"
            value={workoutGoal}
            onChange={setWorkoutGoal}
            onAdd={() => {
              addGoal(workoutGoal, "workout");
              setWorkoutGoal("");
            }}
            goals={goals.filter((g) => g.category === "workout")}
            onToggle={toggleGoal}
            onDelete={deleteGoal}
          />
        </div>
      </div>
    </div>
  );
}


/* Goal Section Box      */

function GoalSection({
  title,
  subtitle,
  placeholder,
  color,
  value,
  onChange,
  onAdd,
  goals,
  onToggle,
  onDelete,
}) {
  const theme =
    color === "green"
      ? {
          box: "bg-green-50 border-green-200",
          button: "bg-green-600 hover:bg-green-700",
          ring: "focus:ring-green-500",
        }
      : {
          box: "bg-blue-50 border-blue-200",
          button: "bg-blue-600 hover:bg-blue-700",
          ring: "focus:ring-blue-500",
        };

  return (
    <div className={`rounded-2xl border p-5 sm:p-8 shadow-md ${theme.box}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
        {title}
      </h2>
      <p className="text-gray-600 mb-5 text-sm sm:text-base">
        {subtitle}
      </p>

      {/* Input + Button (TABLET SAFE) */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <input
          className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.ring}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          onClick={onAdd}
          className={`${theme.button} text-white px-6 py-3 rounded-xl transition w-full lg:w-auto`}
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {goals.length === 0 && (
          <p className="text-gray-500 text-sm">No goals yet</p>
        )}

        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}


/* Individual Goal Item  */

function GoalItem({ goal, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm hover:shadow transition">
      <div
        onClick={() => onToggle(goal.id)}
        className={`cursor-pointer break-words ${
          goal.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {goal.text}
      </div>

      <button
        onClick={() => onDelete(goal.id)}
        className="text-gray-400 hover:text-red-500 transition shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

export default Goals;
