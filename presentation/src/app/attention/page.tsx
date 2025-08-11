"use client";

import Link from "next/link";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { GithubLink } from "@/components/GithubLink";
import { Card } from "@/components/Card";

export default function AttentionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between my-6">
        <Link className="btn btn--outline" href="/?tab=method">← Back to Method</Link>
        <Link className="btn btn--primary" href="/">Home</Link>
      </div>

      <header className="text-center rounded-lg py-10 my-6 bg-purple-500/10 border">
        <h1 className="text-3xl font-semibold">Attention-based Preference Modeling</h1>
        <p className="text-[var(--muted)]">Learning community-specific weights over interpretable attributes</p>
      </header>

      <MathJaxContext>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="text-xl font-semibold">Concept</h3>
            <p className="text-gray-700 mt-2">
              The model represents each candidate response by its attribute vector
              <MathJax inline>{"(a)"}</MathJax>. For a community <MathJax inline>{"(c)"}</MathJax>, an attention mechanism
              produces weights <MathJax inline>{"(w_c)"}</MathJax> over attributes and combines them for a preference score.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold">Why attention?</h3>
            <ul className="list-disc pl-5 text-gray-700 mt-2">
              <li>Flexible re-weighting per community/task</li>
              <li>Interpretable importance scores</li>
              <li>Dynamic adaptation with context</li>
            </ul>
          </Card>
        </div>
      </MathJaxContext>

      <div className="flex items-center justify-between my-6">
        <Link className="btn btn--outline" href="/?tab=method">← Back to Method</Link>
        <Link className="btn btn--primary" href="/">Home</Link>
      </div>

      <footer className="flex justify-center py-8">
        <GithubLink href="https://github.com/ifsheldon/prefpalette_presentation" />
      </footer>
    </div>
  );
}


