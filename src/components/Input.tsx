import type React from "react";

const ButtonState = {
  regular: "border-slate-300",
  error: "border-danger",
};

interface InputProps {
  type: string;
  name: string;
  labelName: string;
  value: string;
  error?: string;
  state: keyof typeof ButtonState;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type,
  name,
  labelName,
  value,
  state,
  error,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="capitalize text-slate-900 text-md">
        {labelName}
      </label>
      <input
        id={name}
        type={type}
        placeholder={`Enter ${labelName}`}
        name={name}
        value={value}
        onChange={onChange}
        className={` ${ButtonState[state]} bg-white border py-2 px-1.5 focus-within:outline focus-within:outline-primary rounded-lg`}
      />
      {state == "error" && (
        <p className="text-danger text-xs">{error}</p>
      )}
    </div>
  );
}

export default Input;
