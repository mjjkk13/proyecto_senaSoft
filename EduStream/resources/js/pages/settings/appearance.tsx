import { Head } from '@inertiajs/react'

import { type BreadcrumbItem } from '@/types'

import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { edit as editAppearance } from '@/routes/appearance'

import ThemeSwitcher from '@/components/ThemeSwitcher' // Ajusta la ruta según tu proyecto

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configuración de apariencia',
    href: editAppearance().url,
  },
]

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración de apariencia" />

      <SettingsLayout>
        <div className="space-y-8">
          {/* Card Apariencia */}
          <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl">
            <div className="p-6">
              <h2 className="text-lg font-bold text-primary mb-2">
                Configuración de apariencia
              </h2>
              <p className="text-sm opacity-70 mb-4">
                Personaliza el aspecto de tu cuenta y cómo se muestra EduStream.
              </p>

              {/* Tabs */}
              <div className="tabs tabs-bordered mb-4">
                <a className="tab tab-active">General</a>
                <a className="tab">Colores</a>
                <a className="tab">Fuentes</a>
              </div>

              {/* Contenido de las pestañas */}
              <div>
                {/* General */}
                <div className="mb-4">
                  <p className="text-sm">Aquí puedes modificar la configuración general de apariencia.</p>
                </div>

                {/* Colores */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Tema</h3>
                  <ThemeSwitcher />
                </div>

                {/* Fuentes */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Fuentes</h3>
                  <p className="text-sm">Aquí puedes personalizar las fuentes (pendiente implementar).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
