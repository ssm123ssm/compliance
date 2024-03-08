// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faMoon,
  faSun,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        defaultSelected
        size="sm"
        color="default"
        startContent={<FontAwesomeIcon icon={faLightbulb} className="p-4" />}
        endContent={<FontAwesomeIcon icon={faMoon} />}
        isSelected={theme === "dark"}
        onValueChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      ></Switch>
    </div>
  );
}
