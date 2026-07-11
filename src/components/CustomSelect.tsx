type SelectOptions = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  isDisable: false;
  label: string;
  name: string;
  options: SelectOptions[];
  value: string;
  onChange: (value: string) => void;
  errors?:string;
};

export default function CustomSelect({
  isDisable,
  label,
  name,
  options,
  value,
  onChange,
  errors
}: CustomSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize text-slate-900 text-sm">
        {label}
      </label>
      <select
        name={name}
        id={name}
        disabled={isDisable}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className={` bg-white border py-2 px-1.5 focus-within:outline
             focus-within:outline-primary text-xs rounded-md
             ${errors? 'border-danger': 'border-slate-300'}`}
      >
        <option value="" disabled></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && (
        <p className="text-danger text-xs">{errors}</p>
      )}
    </div>
  );
}
