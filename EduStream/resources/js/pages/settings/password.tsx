import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { type BreadcrumbItem } from '@/types'
import { Transition } from '@headlessui/react'
import { Form, Head } from '@inertiajs/react'
import { useRef } from 'react'
import { edit } from '@/routes/password'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configuración de contraseña',
    href: edit().url,
  },
]

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración de contraseña" />

      <SettingsLayout>
        <div className="space-y-8">
          {/* Card Contraseña */}
          <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl">
            <div className="card-body">
              <h2 className="card-title text-lg font-bold text-primary">
                Actualizar contraseña
              </h2>
              <p className="text-sm opacity-70 mb-4">
                Asegúrate de usar una contraseña larga y aleatoria para mayor seguridad.
              </p>

              <Form
                {...PasswordController.update.form()}
                options={{ preserveScroll: true }}
                resetOnError={['password', 'password_confirmation', 'current_password']}
                resetOnSuccess
                onError={(errors) => {
                  if (errors.password) {
                    passwordInput.current?.focus()
                  }
                  if (errors.current_password) {
                    currentPasswordInput.current?.focus()
                  }
                }}
                className="space-y-6"
              >
                {({ errors, processing, recentlySuccessful }) => (
                  <>
                    {/* Contraseña actual */}
                    <div className="form-control">
                      <label className="label" htmlFor="current_password">
                        <span className="label-text">Contraseña actual</span>
                      </label>
                      <input
                        id="current_password"
                        ref={currentPasswordInput}
                        name="current_password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="input input-bordered w-full"
                      />
                      {errors.current_password && (
                        <span className="text-error text-sm mt-1">
                          {errors.current_password}
                        </span>
                      )}
                    </div>

                    {/* Nueva contraseña */}
                    <div className="form-control">
                      <label className="label" htmlFor="password">
                        <span className="label-text">Nueva contraseña</span>
                      </label>
                      <input
                        id="password"
                        ref={passwordInput}
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="input input-bordered w-full"
                      />
                      {errors.password && (
                        <span className="text-error text-sm mt-1">
                          {errors.password}
                        </span>
                      )}
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="form-control">
                      <label className="label" htmlFor="password_confirmation">
                        <span className="label-text">Confirmar contraseña</span>
                      </label>
                      <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="input input-bordered w-full"
                      />
                      {errors.password_confirmation && (
                        <span className="text-error text-sm mt-1">
                          {errors.password_confirmation}
                        </span>
                      )}
                    </div>

                    {/* Botones */}
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={processing}
                        className="btn btn-primary rounded-xl"
                        data-test="update-password-button"
                      >
                        Guardar contraseña
                      </button>

                      <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                      >
                        <span className="badge badge-success">Guardada</span>
                      </Transition>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
