import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk']

  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  return (
    <div className="space-y-2">
      <label className="font-semibold">Seleccionar tema:</label>
      <div className="flex flex-wrap gap-2">
        {themes.map((t) => (
          <button
            key={t}
            className={`btn btn-outline btn-sm ${theme === t ? 'btn-primary' : ''}`}
            onClick={() => setTheme(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
