import type { ReactNode } from "react";

type SummaryCardProps = {
  icon: ReactNode;
  iconColour: "text-primary bg-primary/20" | "the";
  summary: string;
  header: string;
  subheader: string;
  className?: string;
};

export default function SummaryCard({
  icon,
  summary,
  header,
  subheader,
  className,
  iconColour,
}: SummaryCardProps) {
  return (
    <div className={`flex items-center gap-4 rounded-md bg-white shadow-md w-fit p-4 ${className}`}>
      <div
        className={`flex items-center justify-center p-4 rounded-full ${iconColour} `}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-4xl font-bold">{summary}</h2>
        <h5 className="text-lg font-semibold capitalize">{header}</h5>
        <p className="text-xs text-pretty text-slate-700">{subheader}</p>
      </div>
    </div>
  );
}
