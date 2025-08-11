"use client";

import { useState, type PropsWithChildren } from "react";

export function Card(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={
        "rounded-lg border p-4 bg-[var(--surface)] shadow-sm hover:shadow-md transition-shadow " +
        (props.className ?? "")
      }
    >
      {props.children}
    </div>
  );
}

export function ExpandableCard(
  props: PropsWithChildren<{ title: string; className?: string }>,
) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className={props.className}>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded((v) => !v)}>
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <span className="text-[var(--primary)] text-xl leading-none select-none">
          {expanded ? "×" : "+"}
        </span>
      </div>
      <div className={expanded ? "mt-3" : "hidden"}>{props.children}</div>
    </Card>
  );
}


