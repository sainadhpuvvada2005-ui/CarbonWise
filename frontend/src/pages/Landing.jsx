import { ArrowRight, BarChart3, Leaf, ShieldCheck, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

function PublicNav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-forest-700">
        <Leaf aria-hidden="true" /> CarbonWise
      </Link>
      <nav className="flex items-center gap-4 text-sm" aria-label="Public navigation">
        <Link to="/about" className="text-slate-700 hover:text-forest-700">About</Link>
        <Link to="/features" className="text-slate-700 hover:text-forest-700">Features</Link>
        <Link to="/login" className="rounded-lg bg-forest-600 px-4 py-2 font-semibold text-white">Login</Link>
      </nav>
    </header>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-forest-50 text-ink">
      <PublicNav />
      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-semibold uppercase tracking-wide text-forest-700">AI-powered climate action</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">CarbonWise</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              Track daily activity, understand your carbon score, earn green points, and get AI-personalized ways to reduce your footprint.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-forest-600 px-5 py-3 font-semibold text-white shadow-glow">
                Start tracking <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/features" className="rounded-lg border border-forest-200 px-5 py-3 font-semibold text-forest-700">
                Explore features
              </Link>
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-glow">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Carbon score", "84/100", BarChart3],
                ["Green streak", "8 days", Leaf],
                ["Security", "JWT + bcrypt", ShieldCheck],
                ["Eco badges", "12 earned", Trophy]
              ].map(([title, value, Icon]) => (
                <div key={title} className="rounded-lg border border-forest-100 p-4">
                  <Icon className="text-forest-600" aria-hidden="true" />
                  <p className="mt-4 text-sm text-slate-600">{title}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { PublicNav };
