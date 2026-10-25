import type { ReactNode } from "react";

type SummaryCardProps = {
  icon: ReactNode;
  iconColour: string;
    // | "text-primary bg-primary/10"
    // | "text-danger bg-danger/10"
    // | "text-warning bg-warning/10"
    // | "text-success bg-success/10";
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
    <div
      className={`flex items-center justify-between rounded-md bg-white shadow-md shadow-primary-light p-4 ${className}`}
    >
      <div
        className={`flex items-center justify-center p-4 rounded-full ${iconColour} `}
      >
        {icon}
      </div>
      <div className="text-right">
        <h2 className="text-2xl font-semibold ">{summary}</h2>
        <h5 className="text-md font-semibold capitalize text-slate-700">{header}</h5>
        <p className="text-xs text-pretty text-slate-700">{subheader}</p>
      </div>
    </div>
  );
}
