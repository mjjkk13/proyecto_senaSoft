import { edit as editAppearance } from '@/routes/appearance'
import { edit as editPassword } from '@/routes/password'
import { edit } from '@/routes/profile'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: edit(),
    icon: null,
  },
  {
    title: 'Password',
    href: editPassword(),
    icon: null,
  },
  {
    title: 'Appearance',
    href: editAppearance(),
    icon: null,
  },
]

export default function SettingsLayout({ children }: PropsWithChildren) {
  if (typeof window === 'undefined') {
    return null
  }

  const currentPath = window.location.pathname

  return (
    <div className="px-4 py-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">Settings</h1>
        <p className="text-sm text-base-content/70">
          Manage your profile and account settings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Sidebar nav */}
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col gap-2">
            {sidebarNavItems.map((item, index) => {
              const isActive =
                currentPath ===
                (typeof item.href === 'string' ? item.href : item.href.url)

              return (
                <Link
                  key={`${typeof item.href === 'string' ? item.href : item.href.url}-${index}`}
                  href={item.href}
                  prefetch
                  className={`btn btn-sm justify-start rounded-lg ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'btn-ghost text-base-content'
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Separator solo en móvil */}
        <div className="divider my-6 lg:hidden"></div>

        {/* Main content */}
        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  )
}
