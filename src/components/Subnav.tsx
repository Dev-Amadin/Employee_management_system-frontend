type SubnavProps = {
  className?: string;
  currentLink: string;
  data: string[];
  onClick: (link: string) => void;
};

export default function Subnav({
  className,
  currentLink,
  data,
  onClick,
}: SubnavProps) {
  return (
    <div className={`flex border-b border-slate-200 w-full bg-white ${className}`}>
      {data.map((link) => (
        <div
          key={link}
          className={`p-2 cursor-pointer transition-colors duration-300
             ${link == currentLink ? "border-b-2 border-primary" : ""}`}
          onClick={() => onClick(link)}
        >
          <p className={`text-xs text-pretty  p-4 ${link == currentLink ? "text-primary font-semibold" : "text-slate-700"}`}>{link}</p>
        </div>
      ))}
    </div>
  );
}
