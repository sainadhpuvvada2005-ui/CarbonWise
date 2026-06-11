import { Brain, ChartPie, Gamepad2, Lock, Target, Trees } from "lucide-react";

import { PublicNav } from "./Landing.jsx";

const features = [
  ["Activity calculator", "Transportation, electricity, food, waste, and water emissions.", ChartPie],
  ["AI recommendations", "Personalized tips, reduction roadmaps, and monthly forecasts.", Brain],
  ["Goals", "Set monthly targets and track progress against live activity data.", Target],
  ["Gamification", "Green points, eco badges, streaks, levels, and leaderboard.", Gamepad2],
  ["Offsets", "Tree plantation, renewable energy support, and offset suggestions.", Trees],
  ["Security", "JWT authentication, bcrypt hashing, validation, and CORS controls.", Lock]
];

export default function Features() {
  return (
    <div className="min-h-screen bg-forest-50">
      <PublicNav />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold">Features</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, text, Icon]) => (
            <article key={title} className="rounded-lg border border-forest-100 bg-white p-5">
              <Icon className="text-forest-600" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
