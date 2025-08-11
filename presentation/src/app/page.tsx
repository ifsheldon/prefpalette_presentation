"use client";

import Link from "next/link";
import { GithubLink } from "@/components/GithubLink";
import { Tabs } from "@/components/Tabs";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, ExpandableCard } from "@/components/Card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center bg-blue-500/10 rounded-lg py-10 mb-6 border">
        <h1 className="text-3xl font-semibold">
          PrefPalette: Personalized Preference Modeling with Latent Attributes
          <a
            className="ml-2 text-[var(--primary)] inline-block align-[-1px]"
            href="https://arxiv.org/abs/2507.13541v1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open paper on arXiv"
          >
            ↗
          </a>
        </h1>
        <p className="text-lg text-[var(--muted)]">A Framework for Community-Specific Preference Learning</p>
        <p className="text-lg text-[var(--muted)]">Published on Conference on Language Modeling (CoLM) 2025</p>
        <div className="flex justify-center gap-6 text-sm text-[var(--muted)] mt-2">
          <span className="font-medium">Meta FAIR, University of Washington, Meta GenAI</span>
          <span className="rounded-full border px-3 py-1 bg-black/5">July 2025</span>
        </div>
      </header>

      <Tabs
        tabs={["overview", "method", "findings", "connections", "discussion"]}
        renderContent={(active) => (
          <main className="min-h-[600px]">
            {active === "overview" && (
              <div>
                <SectionHeader
                  title="Overview & Motivation"
                  subtitle="Understanding the relevance to visualization research"
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <ExpandableCard title="Paper Introduction">
                    <p>
                      <strong>Key Contribution:</strong> A framework that decomposes preferences into
                      attribute dimensions and tailors prediction to distinct social community values.
                    </p>
                  </ExpandableCard>
                  <ExpandableCard title="Why This Matters for Visualization">
                    <p>
                      Visualization also deals with implicit preferences and needs to consider different
                      user groups and communities.
                    </p>
                  </ExpandableCard>
                  <ExpandableCard title="Research Question">
                    <p>How can we model and predict community-specific preferences for better AI personalization?</p>
                  </ExpandableCard>
                </div>
              </div>
            )}

            {active === "method" && (
              <div>
                <SectionHeader
                  title="PrefPalette Method"
                  subtitle="Two-stage framework for preference modeling"
                />
                <Card>
                  <h3 className="text-xl font-semibold">Data</h3>
                  <p className="text-[var(--muted)] mt-2">
                    This work models community-conditioned preferences using text from online communities
                    and synthesized counterfactuals for attributes.
                  </p>
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <Link className="btn btn--sm btn--outline" href="/counterfactual">
                      Counterfactual Details →
                    </Link>
                    <Link className="btn btn--sm btn--outline" href="/attention">
                      Attention Details →
                    </Link>
                  </div>
                </Card>
              </div>
            )}

            {active === "findings" && (
              <div>
                <SectionHeader title="Key Findings" subtitle="Performance results and community insights" />
                <div className="grid md:grid-cols-2 gap-5">
                  <Card>
                    <h3 className="text-xl font-semibold">Performance Results</h3>
                    <div className="text-center mt-4">
                      <div className="text-4xl font-bold text-[var(--primary)] leading-none">46.6%</div>
                      <div className="text-sm text-[var(--muted)] mt-1">Improvement over GPT-4o</div>
                    </div>
                  </Card>
                  <Card>
                    <h3 className="text-xl font-semibold">Community-Specific Preference Profiles</h3>
                    <p className="text-[var(--muted)] mt-2">Examples for scholarly, conflict-oriented, and support-based communities.</p>
                  </Card>
                </div>
              </div>
            )}

            {active === "connections" && (
              <div>
                <SectionHeader title="Connections to Visualization" subtitle="Applying preference modeling to visualization design" />
                <Card>
                  <h3 className="text-xl font-semibold">Target Audiences for Visualization</h3>
                  <img
                    src="/target_audiences_treemap.png"
                    alt="Target Audiences for Visualization Design"
                    className="mt-3 rounded-md border max-w-full"
                  />
                </Card>
              </div>
            )}

            {active === "discussion" && (
              <div>
                <SectionHeader title="Discussion & Questions" subtitle="Research opportunities and challenges" />
                <div className="grid gap-5">
                  <Card>
                    <h3 className="text-lg font-semibold">Research Questions</h3>
                    <ul className="list-disc pl-5 text-gray-700 mt-2">
                      <li>How can we identify preference dimensions for visualization?</li>
                      <li>What attributes matter most for different visualization tasks?</li>
                      <li>Can we build similar preference models for visualization communities?</li>
                    </ul>
                  </Card>
                </div>
              </div>
            )}
          </main>
        )}
      />

      <div className="mt-8 flex justify-between border-t pt-6">
        <button className="btn btn--outline" data-nav="prev">← Previous</button>
        <button className="btn btn--primary" data-nav="next">Next →</button>
      </div>

      <footer className="flex justify-center py-8">
        <GithubLink href="https://github.com/ifsheldon/prefpalette_presentation" />
      </footer>
    </div>
  );
}
