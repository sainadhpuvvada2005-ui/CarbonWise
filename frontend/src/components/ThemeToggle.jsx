import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("carbonwise_theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("carbonwise_theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setDark((value) => !value)}
      className="inline-flex items-center gap-2 rounded-lg border border-forest-200 px-4 py-2 text-sm font-medium dark:border-forest-800"
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
