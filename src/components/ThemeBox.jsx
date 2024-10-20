import { useState, useEffect } from "react";

const ThemeBox = () => {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const classNames = ["default", "forest", "zen"];

  // Rotate through themes when 'T' is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "t") {
        const currentIndex = classNames.indexOf(selectedTheme);
        const nextTheme = classNames[(currentIndex + 1) % classNames.length];
        handleThemeChange(nextTheme);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTheme, classNames]);

  // Function to handle theme change (via radio button or keypress)
  const handleThemeChange = (theme) => {
    resetClasses(classNames);
    setSelectedTheme(theme);

    if (theme === "default") {
      document.documentElement.style.setProperty("--backgroundColor", "#191919");
      document.documentElement.style.setProperty("--boxColor", "#2c2c2c");
      document.documentElement.style.setProperty("--lightColor", "#ffff7c");
    } else if (theme === "forest") {
      document.documentElement.style.setProperty("--backgroundColor", "#1A3636");
      document.documentElement.style.setProperty("--boxColor", "#626F47");
      document.documentElement.style.setProperty("--lightColor", "#FEFAE0");
    } else if (theme === "zen") {
      document.documentElement.style.setProperty("--backgroundColor", "#001F3F");
      document.documentElement.style.setProperty("--boxColor", "#16325B");
      document.documentElement.style.setProperty("--lightColor", "#78B7D0");
    }

    document.querySelector('.slotMachine').classList.add(theme);
    document.querySelector('body').classList.add(theme);
    document.querySelector('.profileCard').classList.add(theme);
  };

  // Function to reset classes
  const resetClasses = (classNames) => {
    classNames.forEach((element) => {
      document.querySelector('.slotMachine').classList.remove(element);
      document.querySelector('body').classList.remove(element);
      document.querySelector('.profileCard').classList.remove(element);
    });
  };

  return (
    <div className="theme flex flex-col gap-4 py-4 border-b border-neutral-700">
      <h1 className="text-2xl pb-1">Theme</h1>

      <div className="flex gap-3">
        {/* Default */}
        <label
          className={`flex w-full items-center gap-2 border border-neutral-700 px-2 py-1 pr-3 rounded-md ${
            selectedTheme === "default" ? "selected-label" : ""
          }`}
        >
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === "default"}
            onChange={() => handleThemeChange("default")}
          />
          <span>Default</span>
        </label>

        {/* Forest */}
        <label
          className={`flex w-full items-center gap-2 border border-neutral-700 px-2 py-1 pr-3 rounded-md ${
            selectedTheme === "forest" ? "selected-label" : ""
          }`}
        >
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === "forest"}
            onChange={() => handleThemeChange("forest")}
          />
          <span>Forest</span>
        </label>

        {/* Zen */}
        <label
          className={`flex w-full items-center gap-2 border border-neutral-700 px-2 py-1 pr-3 rounded-md ${
            selectedTheme === "zen" ? "selected-label border-black" : ""
          }`}
        >
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === "zen"}
            onChange={() => handleThemeChange("zen")}
          />
          <span>Zen</span>
        </label>
      </div>
    </div>
  );
};

export default ThemeBox;
