import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import ChartPanel from "../components/ChartPanel.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { api } from "../lib/api.js";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    Promise.all([api.analytics(), api.leaderboard()]).then(([a, l]) => {
      setAnalytics(a);
      setLeaderboard(l);
    });
  }, []);

  if (!analytics) return <EmptyState title="Loading analytics" message="Crunching your climate data." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-slate-600 dark:text-forest-100">Forecast next month: {analytics.forecast_next_month} kg CO2e.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartPanel title="Daily emission summary">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.daily_summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="emissions" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Monthly emission trends">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.monthly_trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="emissions" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
          <h2 className="text-xl font-semibold">Goal completion</h2>
          <div className="mt-4 space-y-4">
            {analytics.goal_progress.length === 0 && <p className="text-sm text-slate-600 dark:text-forest-100">Create a goal from your profile page.</p>}
            {analytics.goal_progress.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between text-sm"><span>{goal.title}</span><span>{goal.progress_percent}%</span></div>
                <div className="mt-2 h-3 rounded-full bg-forest-100"><div className="h-3 rounded-full bg-forest-600" style={{ width: `${goal.progress_percent}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <ol className="mt-4 space-y-3">
            {leaderboard.map((row) => (
              <li key={row.rank} className="flex items-center justify-between rounded-lg bg-forest-50 px-3 py-2 dark:bg-forest-900">
                <span>{row.rank}. {row.full_name}</span>
                <strong>{row.green_points} pts</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
