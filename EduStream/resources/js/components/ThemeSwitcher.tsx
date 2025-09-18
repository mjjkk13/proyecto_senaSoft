import { Appearance, useAppearance } from "@/hooks/use-appearance";

const themes: string[] = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "halloween",
];

export default function ThemeSwitcher() {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        Tema: {appearance}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button onClick={() => updateAppearance("system")}>
            System (auto)
          </button>
        </li>
        {themes.map((t) => (
          <li key={t}>
            <button
              onClick={() => updateAppearance(t as Appearance)}
              className={appearance === t ? "font-bold" : ""}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
