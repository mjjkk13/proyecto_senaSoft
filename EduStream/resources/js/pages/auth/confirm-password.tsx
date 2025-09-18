import ConfirmablePasswordController from '@/actions/App/Http/Controllers/Auth/ConfirmablePasswordController';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirm your password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            <Head title="Confirm password" />

            <Form {...ConfirmablePasswordController.store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        {errors.password && (
                            <div className="alert alert-error">
                                <span>{errors.password}</span>
                            </div>
                        )}
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

                        <div className="flex items-center">
                            <button className="btn btn-primary w-full" disabled={processing} data-test="confirm-password-button">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Confirm password
                            </button>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
