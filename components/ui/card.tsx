import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-lg border border-petrol/10 bg-white p-6 shadow-[0_20px_60px_rgba(15,61,68,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}
