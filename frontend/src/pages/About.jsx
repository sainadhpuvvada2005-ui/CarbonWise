import { Link } from "react-router-dom";

import { PublicNav } from "./Landing.jsx";

export default function About() {
  return (
    <div className="min-h-screen bg-forest-50">
      <PublicNav />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">About CarbonWise</h1>
        <p className="mt-4 text-lg text-slate-700">
          CarbonWise helps people turn everyday choices into measurable climate progress. It combines activity tracking, carbon accounting, analytics, and recommendation logic into a practical sustainability companion.
        </p>
        <Link to="/register" className="mt-8 inline-block rounded-lg bg-forest-600 px-5 py-3 font-semibold text-white">Create your account</Link>
      </main>
    </div>
  );
}
