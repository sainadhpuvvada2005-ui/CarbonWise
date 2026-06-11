import { Award, Flame, Gauge, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import ChartPanel from "../components/ChartPanel.jsx";
import EmptyState from "../components/EmptyState.jsx";
import StatCard from "../components/StatCard.jsx";
import { api } from "../lib/api.js";

const COLORS = ["#16a34a", "#22c55e", "#65a30d", "#0f766e", "#84cc16"];

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    Promise.all([api.analytics(), api.recommendations()]).then(([a, r]) => {
      setAnalytics(a);
      setRecommendations(r);
    });
  }, []);

  if (!analytics) return <EmptyState title="Loading dashboard" message="Preparing your sustainability snapshot." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-slate-600 dark:text-forest-100">Your carbon score, progress, challenges, and AI roadmap.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total carbon score" value={`${analytics.total_emissions} kg`} label="All tracked emissions" icon={Leaf} />
        <StatCard title="AI sustainability score" value={`${analytics.sustainability_score}/100`} label="Last 30 days" icon={Gauge} />
        <StatCard title="Green points" value={analytics.green_points} label={analytics.level} icon={Award} />
        <StatCard title="Green streak" value={`${analytics.green_streak} days`} label="Keep the run alive" icon={Flame} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartPanel title="Weekly emission trends">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.weekly_trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="emissions" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title="Category breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={analytics.category_breakdown} dataKey="emissions" nameKey="category" outerRadius={100} label>
                {analytics.category_breakdown.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
      <section className="grid gap-4 lg:grid-cols-3">
        {recommendations.map((item) => (
          <article key={item.title} className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
            <p className="text-sm font-semibold uppercase text-forest-700 dark:text-forest-100">{item.category}</p>
            <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-forest-100">{item.message}</p>
            <span className="mt-4 inline-block rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700 dark:bg-forest-900 dark:text-forest-50">{item.impact} impact</span>
          </article>
        ))}
      </section>
    </div>
  );
}
