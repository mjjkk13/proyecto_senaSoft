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
    label: undefined
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
            <div className="card-body">
              <h2 className="card-title text-lg font-bold text-primary">
                Configuración de apariencia
              </h2>
              <p className="text-sm opacity-70 mb-4">
                Personaliza el aspecto de tu cuenta y cómo se muestra EduStream.
              </p>

              {/* ThemeSwitcher */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Tema</h3>
                <ThemeSwitcher />
              </div>

              {/* Futuras secciones */}
              <div className="mt-6">
                <h3 className="font-semibold text-sm">Fuentes</h3>
                <p className="text-sm opacity-70">
                  Aquí puedes personalizar las fuentes de la interfaz (pendiente implementar).
                </p>
              </div>
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
