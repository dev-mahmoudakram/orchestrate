export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-petrol/10 bg-soft/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-orange">Phase 1 Foundation</p>
          <h1 className="text-xl font-semibold text-petrol">Admin workspace</h1>
        </div>
        <div className="rounded-full border border-petrol/10 bg-white px-4 py-2 text-sm text-petrol/70">
          Placeholder session
        </div>
      </div>
    </header>
  );
}
