import { useEffect, useState } from "react";

const DarkThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="ml-4 text-center">
      <input type="checkbox" className="toggle block bg-[#c33827] russo-one-regular" onClick={toggleTheme} />
      <p>
        <span className="text-[#c33827] font-bold">Dark / Light</span>
      </p>
    </div>
  );
};

export default DarkThemeToggle;
