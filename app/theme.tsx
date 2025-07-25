import { createContext } from "react";

export const themeContext = createContext({
  theme: "dark" as "light" | "dark",
  toggleDarkMode: () => {},
});


