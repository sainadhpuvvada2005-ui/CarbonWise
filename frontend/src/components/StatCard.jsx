export default function StatCard({ title, value, label, icon: Icon }) {
  return (
    <section className="animate-rise rounded-lg border border-forest-100 bg-white p-5 shadow-glow dark:border-forest-900 dark:bg-[#0a1d10]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-600 dark:text-forest-100">{title}</p>
          <p className="mt-2 text-3xl font-bold text-ink dark:text-white">{value}</p>
          {label && <p className="mt-1 text-sm text-forest-700 dark:text-forest-100">{label}</p>}
        </div>
        {Icon && (
          <span className="rounded-lg bg-forest-100 p-3 text-forest-700 dark:bg-forest-900 dark:text-forest-50">
            <Icon aria-hidden="true" />
          </span>
        )}
      </div>
    </section>
  );
}
