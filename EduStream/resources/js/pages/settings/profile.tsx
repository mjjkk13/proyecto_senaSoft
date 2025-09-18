import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
import { send } from '@/routes/verification'
import { type BreadcrumbItem, type SharedData } from '@/types'
import { Transition } from '@headlessui/react'
import { Form, Head, Link, usePage } from '@inertiajs/react'


import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { edit } from '@/routes/profile'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configuración de perfil',
    href: edit().url,
  },
]

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const { auth } = usePage<SharedData>().props

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración de perfil" />

      <SettingsLayout>
        <div className="space-y-8">
          {/* Card Información de perfil */}
          <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl">
            <div className="card-body">
              <h2 className="card-title text-lg font-bold text-primary">Información de perfil</h2>
              <p className="text-sm opacity-70 mb-4">
                Actualiza tu nombre y correo electrónico.
              </p>

              <Form
                {...ProfileController.update.form()}
                options={{ preserveScroll: true }}
                className="space-y-6"
              >
                {({ processing, recentlySuccessful, errors }) => (
                  <>
                    {/* Nombre */}
                    <div className="form-control">
                      <label className="label" htmlFor="name">
                        <span className="label-text">Nombre completo</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={auth.user.name}
                        placeholder="Tu nombre"
                        required
                        autoComplete="name"
                        className="input input-bordered w-full"
                      />
                      {errors.name && (
                        <span className="text-error text-sm mt-1">{errors.name}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                      <label className="label" htmlFor="email">
                        <span className="label-text">Correo electrónico</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={auth.user.email}
                        placeholder="correo@ejemplo.com"
                        required
                        autoComplete="username"
                        className="input input-bordered w-full"
                      />
                      {errors.email && (
                        <span className="text-error text-sm mt-1">{errors.email}</span>
                      )}
                    </div>

                    {/* Verificación email */}
                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                      <div className="mt-2">
                        <div className="alert alert-warning rounded-xl">
                          <span>
                            Tu correo aún no está verificado.{' '}
                            <Link
                              href={send()}
                              as="button"
                              className="link link-primary"
                            >
                              Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                          </span>
                        </div>

                        {status === 'verification-link-sent' && (
                          <div className="badge badge-success mt-2">
                            Nuevo enlace de verificación enviado.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Botones */}
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="btn btn-primary rounded-xl"
                      >
                        Guardar cambios
                      </button>

                      <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                      >
                        <p className="text-sm text-success">Guardado</p>
                      </Transition>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>

          {/* Eliminar usuario */}
          <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl">
            <div className="card-body">
              
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
