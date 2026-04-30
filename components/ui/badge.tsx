import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "petrol" | "orange" | "turquoise";
};

const tones = {
  petrol: "bg-petrol/10 text-petrol",
  orange: "bg-orange/10 text-orange",
  turquoise: "bg-turquoise/20 text-petrol",
};

export function Badge({ children, tone = "petrol" }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
