import { type BreadcrumbItem } from '@/types'
import { type PropsWithChildren } from 'react'
import { Link } from '@inertiajs/react'

interface AppSidebarLayoutProps {
  breadcrumbs?: BreadcrumbItem[]
}

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<AppSidebarLayoutProps>) {
  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col">
        <div className="p-4 text-xl font-bold text-primary border-b border-base-300">
          EduStream
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Aquí agregas tus links de navegación */}
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-primary hover:text-white">
            Dashboard
          </Link>
          <Link href="/cursos" className="block px-4 py-2 rounded-lg hover:bg-primary hover:text-white">
            Cursos
          </Link>
          <Link href="/perfil" className="block px-4 py-2 rounded-lg hover:bg-primary hover:text-white">
            Perfil
          </Link>
          {/* Agrega más items según tu menú */}
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="bg-base-100 border-b border-base-300 px-6 py-3 flex items-center gap-2 text-sm text-base-content">
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={breadcrumb.href}>
                <Link
                  href={breadcrumb.href}
                  className="text-primary hover:underline"
                >
                  {breadcrumb.title}
                </Link>
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </div>
        )}

        {/* Contenido */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
