import { useContext } from "react";
import { buttonStyle } from "~/styles";
import { themeContext } from "~/theme";

export function ThemeSwitch() {
  const { theme, toggleDarkMode } = useContext(themeContext);

  return (
    <button onClick={toggleDarkMode} className={buttonStyle}>
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </button>
  );
}
