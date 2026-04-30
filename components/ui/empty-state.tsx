import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-petrol/20 bg-white/70 p-8 text-center">
      <h2 className="text-lg font-semibold text-petrol">{title}</h2>
      {description ? <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-petrol/65">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
