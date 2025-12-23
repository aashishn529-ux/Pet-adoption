import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    bg: "#0f172a",
    card: "#ffffff",
    accent: "#22c55e",
    text: "#f8fafc",
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
