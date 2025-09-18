import { useCallback, useEffect, useState } from "react";

export type Appearance =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "halloween"
  | "system";

const prefersDark = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
  let theme = appearance;

  if (appearance === "system") {
    theme = prefersDark() ? "dark" : "light";
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
};

const mediaQuery = () => {
  if (typeof window === "undefined") return null;
  return window.matchMedia("(prefers-color-scheme: dark)");
};

const handleSystemThemeChange = () => {
  const currentAppearance = (localStorage.getItem("appearance") as Appearance) || "system";
  applyTheme(currentAppearance);
};

export function initializeTheme() {
  const savedAppearance = (localStorage.getItem("appearance") as Appearance) || "system";
  applyTheme(savedAppearance);
  mediaQuery()?.addEventListener("change", handleSystemThemeChange);
}

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>("system");

  const updateAppearance = useCallback((mode: Appearance) => {
    setAppearance(mode);
    localStorage.setItem("appearance", mode);
    setCookie("appearance", mode);
    applyTheme(mode);
  }, []);

  useEffect(() => {
    const savedAppearance = (localStorage.getItem("appearance") as Appearance) || "system";
    updateAppearance(savedAppearance);

    return () => mediaQuery()?.removeEventListener("change", handleSystemThemeChange);
  }, [updateAppearance]);

  return { appearance, updateAppearance } as const;
}
