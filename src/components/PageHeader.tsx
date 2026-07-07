import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subheading: string;
  button?: ReactNode;
  icon: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  subheading,
  button,
  icon,
  className,
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center p-4 rounded-full shadow-md bg-white text-primary">
          {icon}
        </div>
        <div>
          <h1 className="text-xl font-semibold capitalize text-primary">
            {title}
          </h1>
          <p className="text-xs text-pretty text-slate-700">{subheading}</p>
        </div>
      </div>
      <div>{button}</div>
    </div>
  );
}
