import ThemeToggle from "../components/ThemeToggle.jsx";

export default function Settings() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-600 dark:text-forest-100">Personalize your CarbonWise experience.</p>
        <div className="mt-6">
          <ThemeToggle />
        </div>
      </section>
      <section className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
        <h2 className="text-xl font-semibold">Carbon offset suggestions</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["Tree plantation", "Renewable energy support", "Verified carbon offset programs"].map((item) => (
            <article key={item} className="rounded-lg bg-forest-50 p-4 dark:bg-forest-900">
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-forest-100">Use this pathway to balance unavoidable emissions.</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
