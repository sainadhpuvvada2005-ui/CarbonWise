export default function ChartPanel({ title, children }) {
  return (
    <section className="rounded-lg border border-forest-100 bg-white p-5 dark:border-forest-900 dark:bg-[#0a1d10]">
      <h2 className="mb-4 text-lg font-semibold text-ink dark:text-white">{title}</h2>
      <div className="h-72" role="img" aria-label={title}>
        {children}
      </div>
    </section>
  );
}
