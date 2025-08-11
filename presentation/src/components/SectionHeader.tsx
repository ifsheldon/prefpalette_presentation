export function SectionHeader(props: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-semibold mb-2">{props.title}</h2>
      {props.subtitle ? (
        <p className="text-lg text-[var(--muted)]">{props.subtitle}</p>
      ) : null}
    </div>
  );
}


