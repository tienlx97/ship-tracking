import { Card } from "@heroui/react";

export function ContractWorkspace() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
            Contract Builder
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold text-slate-950">
            CIF sale contract workspace
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Project structure is ready for contract inputs, validation, services,
            and document export flows.
          </p>
        </div>
        <Card className="self-start">
          <Card.Header>
            <Card.Title>Feature 0001</Card.Title>
            <Card.Description>
              Next.js, TypeScript, Tailwind CSS, HeroUI, services, and tests are
              scaffolded.
            </Card.Description>
          </Card.Header>
        </Card>
      </section>
    </main>
  );
}
