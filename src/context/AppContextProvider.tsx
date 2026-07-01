import { type ReactNode } from "react";
import ThemeContext from "./ThemeContextProvider";

export default function AppContextProvider({ children }: Props) {
  return <ThemeContext>{children}</ThemeContext>;
}


interface Props {
  children: ReactNode;
}
