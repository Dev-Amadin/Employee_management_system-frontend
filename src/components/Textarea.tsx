const ErrorState = {
  regular: "border-slate-300",
  error: "border-danger",
};

interface TextareaProps {
  name: string;
  label: string;
  value: string;
  rows?: number;
  error?: string;
  state: keyof typeof ErrorState;
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  name,
  label,
  value,
  state,
  error,
  rows,
  onChange,
  autocomplete,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize text-slate-900 text-sm">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={`Enter ${label}`}
        value={value}
        autoComplete={autocomplete}
        rows={rows}
        onChange={onChange}
        className={` ${ErrorState[state]} bg-white border py-2 px-1.5 focus-within:outline focus-within:outline-primary text-xs rounded-md`}
      ></textarea>
      {state == "error" && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
}
