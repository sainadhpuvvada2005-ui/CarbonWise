import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-forest-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 shadow-glow" aria-label="Registration form">
        <h1 className="text-3xl font-bold">Create account</h1>
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <label className="mt-6 block text-sm font-medium" htmlFor="full_name">Full name</label>
        <input id="full_name" required value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" />
        <label className="mt-4 block text-sm font-medium" htmlFor="email">Email</label>
        <input id="email" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" />
        <label className="mt-4 block text-sm font-medium" htmlFor="password">Password</label>
        <input id="password" type="password" minLength={8} required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" />
        <button className="mt-6 w-full rounded-lg bg-forest-600 px-4 py-3 font-semibold text-white" type="submit">Register</button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-forest-700">Login</Link>
        </p>
      </form>
    </main>
  );
}
