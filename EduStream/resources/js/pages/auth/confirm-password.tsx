import ConfirmablePasswordController from '@/actions/App/Http/Controllers/Auth/ConfirmablePasswordController';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function ConfirmPassword() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
            <Head title="Confirm password" />

            {/* Card principal */}
            <div className="w-full max-w-md rounded-lg bg-base-100 shadow-lg p-8">
                {/* Encabezado */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Confirm your password</h1>
                    <p className="text-sm text-base-content/70">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </p>
                </div>

                {/* Formulario */}
                <Form {...ConfirmablePasswordController.store.form()} resetOnSuccess={['password']}>
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            {errors.password && (
                                <div className="alert alert-error">
                                    <span>{errors.password}</span>
                                </div>
                            )}

                            {/* Input */}
                            <div className="grid gap-2">
                                <label htmlFor="password" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="input input-bordered w-full"
                                />
                                {errors.password && (
                                    <span className="text-error text-sm">{errors.password}</span>
                                )}
                            </div>

                            {/* Botón */}
                            <div className="flex items-center">
                                <button
                                    className="btn btn-primary w-full"
                                    disabled={processing}
                                    data-test="confirm-password-button"
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Confirm password
                                </button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}
