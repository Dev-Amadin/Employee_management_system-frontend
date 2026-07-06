import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subheading: string;
  button?: ReactNode;
  className?:string;
};

export default function PageHeader({
  title,
  subheading,
  button,
  className
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold capitalize text-primary">{title}</h1>
        <p className="text-xs text-pretty text-slate-400">{subheading}</p>
      </div>
      <div>
        {button}
      </div>
    </div>
  );
}
