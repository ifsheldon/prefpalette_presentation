"use client";

import Link from "next/link";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { GithubLink } from "@/components/GithubLink";
import { Card } from "@/components/Card";

export default function CounterfactualPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between my-6">
        <Link className="btn btn--outline" href="/?tab=method">← Back to Method</Link>
        <Link className="btn btn--primary" href="/">Home</Link>
      </div>

      <header className="text-center rounded-lg py-10 my-6 bg-yellow-500/10 border">
        <h1 className="text-3xl font-semibold">Counterfactual Attribute Synthesis</h1>
        <p className="text-[var(--muted)]">Training specialized attribute predictors with controlled generations</p>
      </header>

      <MathJaxContext>
        <Card>
          <h3 className="text-xl font-semibold">Purpose</h3>
          <ul className="list-disc pl-5 text-gray-700 mt-2">
            <li>Train specialized attribute predictors without noisy labels.</li>
            <li>Overcome confounds and inconsistent annotation; cover rare cases.</li>
          </ul>
        </Card>

        <Card className="mt-4">
          <h3 className="text-xl font-semibold">How It Works</h3>
          <ol className="list-decimal pl-5 text-gray-700 mt-2 space-y-2">
            <li>
              <strong>Pick an attribute dimension</strong> (e.g., Formality)
            </li>
            <li>
              <strong>Generate controlled variations (counterfactuals)</strong>
            </li>
            <li>
              <strong>Preserve all other attributes</strong>
              <div className="mt-2 rounded border p-3 bg-black/5 font-mono">
                <MathJax inline={false}>{`\\[ s(y_{a,l}) \\approx s(y),\\quad A_a(y_{a,l}) \\approx l,\\quad A_k(y_{a,l}) \\approx A_k(y) \\; \\forall k \\neq a \\]`}</MathJax>
              </div>
            </li>
            <li>
              <strong>Form paired training data</strong>
            </li>
            <li>
              <strong>Contrastive Attribute Distillation</strong>
              <div className="mt-2 rounded border p-3 bg-black/5 font-mono">
                <MathJax inline={false}>{`\\[ L_{attr} = -\\log \\sigma\\big(r_a(y_{a,l_2}) - r_a(y_{a,l_1})\\big), \\quad l_2 > l_1 \\]`}</MathJax>
              </div>
            </li>
          </ol>
        </Card>
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


