"use client";

import { useEffect, useMemo, useState } from "react";

type TabsProps = {
  tabs: string[];
  renderContent: (activeTab: string) => React.ReactNode;
};

export function Tabs(props: TabsProps) {
  const { tabs, renderContent } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const active = tabs[activeIndex] ?? tabs[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (!tabParam) return;
    const idx = tabs.indexOf(tabParam);
    if (idx !== -1) setActiveIndex(idx);
  }, [tabs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        setActiveIndex((i) => i - 1);
      } else if (e.key === "ArrowRight" && activeIndex < tabs.length - 1) {
        setActiveIndex((i) => i + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, tabs.length]);

  useEffect(() => {
    const updateButtons = () => {
      const prev = document.querySelector<HTMLButtonElement>("button[data-nav=prev]");
      const next = document.querySelector<HTMLButtonElement>("button[data-nav=next]");
      if (prev) {
        prev.disabled = activeIndex === 0;
        prev.onclick = () => setActiveIndex((i) => Math.max(0, i - 1));
      }
      if (next) {
        next.disabled = activeIndex === tabs.length - 1;
        next.textContent = activeIndex === tabs.length - 1 ? "Discussion Complete" : "Next →";
        next.classList.toggle("btn--secondary", activeIndex === tabs.length - 1);
        next.classList.toggle("btn--primary", activeIndex !== tabs.length - 1);
        next.onclick = () => setActiveIndex((i) => Math.min(tabs.length - 1, i + 1));
      }
    };
    updateButtons();
  }, [activeIndex, tabs.length]);

  return (
    <div>
      <nav className="flex gap-1 bg-[var(--surface)] rounded-lg p-2 shadow-sm overflow-x-auto border border-black/10">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveIndex(i)}
            className={
              "min-w-max px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap " +
              (i === activeIndex
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "hover:bg-black/5 text-[var(--muted)]")
            }
          >
            {labelFor(t)}
          </button>
        ))}
      </nav>
      <div className="mt-6 h-[3px] rounded-full bg-black/10">
        <div
          className="h-[3px] rounded-full bg-[var(--primary)] transition-all"
          style={{ width: `${((activeIndex + 1) / tabs.length) * 100}%` }}
        />
      </div>
      <div className="mt-6 animate-in">
        {renderContent(active)}
      </div>
    </div>
  );
}

function labelFor(tab: string) {
  switch (tab) {
    case "overview":
      return "Overview & Motivation";
    case "method":
      return "PrefPalette Method";
    case "findings":
      return "Key Findings";
    case "connections":
      return "Connections to Visualization";
    case "discussion":
      return "Discussion & Questions";
    default:
      return tab;
  }
}


