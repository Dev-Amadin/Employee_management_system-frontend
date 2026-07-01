import { createContext, useContext, useState, type ReactNode } from "react";

const ThemeContext = createContext<ThemeContextType>({
  isMenuActive: true,
  setIsMenuActive: () => {},
});

function ThemeContextProvider({ children }: Props) {
  const [isMenuActive, setIsMenuActive] = useState(true);

  return (
    <ThemeContext.Provider value={{ isMenuActive, setIsMenuActive }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

export function useThemeContext() {
  return useContext(ThemeContext);
}

interface ThemeContextType {
  isMenuActive: boolean;
  setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}
