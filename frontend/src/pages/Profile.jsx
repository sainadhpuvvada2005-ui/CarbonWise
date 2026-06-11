import { useState } from "react";

import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../lib/api.js";

export default function Profile() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [goal, setGoal] = useState({
    title: "Monthly carbon reduction",
    baseline_kg: 300,
    target_kg: 240,
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)
  });

  async function createGoal(event) {
    event.preventDefault();
    await api.createGoal({ ...goal, baseline_kg: Number(goal.baseline_kg), target_kg: Number(goal.target_kg) });
    setMessage("Goal created. Your analytics dashboard is updated.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
        <h1 className="text-3xl font-bold">Profile</h1>
        <dl className="mt-6 space-y-3">
          <div><dt className="text-sm text-slate-600 dark:text-forest-100">Name</dt><dd className="font-semibold">{user.full_name}</dd></div>
          <div><dt className="text-sm text-slate-600 dark:text-forest-100">Email</dt><dd className="font-semibold">{user.email}</dd></div>
          <div><dt className="text-sm text-slate-600 dark:text-forest-100">Level</dt><dd className="font-semibold">{user.sustainability_level}</dd></div>
          <div><dt className="text-sm text-slate-600 dark:text-forest-100">Green points</dt><dd className="font-semibold">{user.green_points}</dd></div>
        </dl>
      </section>
      <section className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
        <h2 className="text-2xl font-bold">Set sustainability goal</h2>
        {message && <p className="mt-4 rounded-md bg-forest-100 p-3 text-sm text-forest-700" role="status">{message}</p>}
        <form onSubmit={createGoal} className="mt-5 space-y-4">
          {Object.keys(goal).map((field) => (
            <label key={field} className="block text-sm font-medium">
              {field.replace("_", " ")}
              <input
                type={field.includes("date") ? "date" : field.includes("kg") ? "number" : "text"}
                value={goal[field]}
                onChange={(event) => setGoal({ ...goal, [field]: event.target.value })}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-ink"
              />
            </label>
          ))}
          <button type="submit" className="rounded-lg bg-forest-600 px-4 py-3 font-semibold text-white">Create goal</button>
        </form>
      </section>
    </div>
  );
}
