import type React from "react";

const ButtonType = {
  primary: "bg-primary hover:bg-primary-dark text-white",
  secondary:
    "bg-white border text-slate-500 border-slate-300 hover:bg-slate-50",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

interface ButtonProps {
  type: keyof typeof ButtonType;
  text: string;
  childern?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ type, text, childern, onClick }: ButtonProps) {
  return (
    <button
      className={`${ButtonType[type]} flex justify-center 
  items-center rounded-lg py-1 px-6  cursor-pointer transition-colors duration-300`}
      onClick={onClick}
    >
      <span>{childern}</span>
      {text}
    </button>
  );
}

export default Button;
