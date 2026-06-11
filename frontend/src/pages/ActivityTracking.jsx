import { useEffect, useMemo, useState } from "react";

import EmptyState from "../components/EmptyState.jsx";
import { activityOptions } from "../data/activityOptions.js";
import { api } from "../lib/api.js";

const today = new Date().toISOString().slice(0, 10);

export default function ActivityTracking() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    category: "transportation",
    activity_type: "car",
    quantity: 10,
    unit: "km",
    activity_date: today,
    notes: ""
  });

  const selected = useMemo(() => activityOptions[form.category], [form.category]);

  async function load() {
    setActivities(await api.activities());
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await api.createActivity({ ...form, quantity: Number(form.quantity) });
      setForm({ ...form, quantity: 1, notes: "" });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    await api.deleteActivity(id);
    await load();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <section className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
        <h1 className="text-2xl font-bold">Track activity</h1>
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <form onSubmit={submit} className="mt-5 space-y-4" aria-label="Activity tracking form">
          <label className="block text-sm font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(event) => {
              const category = event.target.value;
              setForm({ ...form, category, activity_type: activityOptions[category].types[0], unit: activityOptions[category].unit });
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-ink"
          >
            {Object.entries(activityOptions).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
          </select>
          <label className="block text-sm font-medium" htmlFor="activity_type">Activity type</label>
          <select id="activity_type" value={form.activity_type} onChange={(event) => setForm({ ...form, activity_type: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-ink">
            {selected.types.map((type) => <option key={type}>{type}</option>)}
          </select>
          <label className="block text-sm font-medium" htmlFor="quantity">Quantity</label>
          <input id="quantity" type="number" min="0.1" step="0.1" required value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-ink" />
          <label className="block text-sm font-medium" htmlFor="unit">Unit</label>
          <input id="unit" required value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-ink" />
          <label className="block text-sm font-medium" htmlFor="activity_date">Date</label>
          <input id="activity_date" type="date" required value={form.activity_date} onChange={(event) => setForm({ ...form, activity_date: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-ink" />
          <label className="block text-sm font-medium" htmlFor="notes">Notes</label>
          <textarea id="notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-ink" />
          <button type="submit" className="w-full rounded-lg bg-forest-600 px-4 py-3 font-semibold text-white">Add activity</button>
        </form>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Recent records</h2>
        <div className="mt-4 space-y-3">
          {activities.length === 0 && <EmptyState title="No activities yet" message="Add your first activity to generate analytics." />}
          {activities.map((activity) => (
            <article key={activity.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-forest-100 bg-white p-4 dark:border-forest-900 dark:bg-[#0a1d10]">
              <div>
                <p className="font-semibold capitalize">{activity.activity_type} · {activity.category}</p>
                <p className="text-sm text-slate-600 dark:text-forest-100">{activity.quantity} {activity.unit} on {activity.activity_date}</p>
              </div>
              <div className="flex items-center gap-3">
                <strong>{activity.emission_kg} kg</strong>
                <button type="button" onClick={() => remove(activity.id)} className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-700">Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
