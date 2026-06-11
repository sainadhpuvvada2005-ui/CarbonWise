export default function EmptyState({ title, message }) {
  return (
    <div className="rounded-lg border border-dashed border-forest-200 bg-white p-8 text-center dark:border-forest-900 dark:bg-[#0a1d10]">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-forest-100">{message}</p>
    </div>
  );
}
