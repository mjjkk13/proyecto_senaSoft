import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ForgotPassword({ status }: { status?: string }) {
    // --- Validaciones ---
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const [emailError, setEmailError] = useState<string | null>(null);

    const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!validateEmail(e.target.value.trim())) {
            setEmailError("Por favor ingresa un correo válido.");
        } else {
            setEmailError(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <Head title="Olvidé mi contraseña - EduStream" />
            
            {/* EduStream Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-green-500 md:h-12 md:w-12">
                            <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6 text-white md:h-7 md:w-7"/>
                        </div>
                        <span className="text-2xl font-bold text-white md:text-3xl">
                            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Edu</span>
                            <span className="text-white">Stream</span>
                        </span>
                    </Link>
                </div>
            </header>

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
            <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>
            
            {/* Main Content */}
            <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-slate-800/90 p-8 shadow-2xl backdrop-blur-sm border border-slate-700/50">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Recuperar contraseña</h1>
                            <p className="text-slate-300">Ingresa tu correo y te enviaremos un enlace de restablecimiento</p>
                        </div>

                        {status && (
                            <div className="mb-4 text-center text-sm font-medium text-green-500">
                                {status}
                            </div>
                        )}

                        <Form {...PasswordResetLinkController.store.form()} className="space-y-6">
                            {({ processing, errors }) => (
                                <>
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="Correo electrónico"
                                            className={`h-12 bg-slate-700/50 border ${emailError || errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"} text-white placeholder:text-slate-400 rounded-lg`}
                                            onBlur={handleBlurEmail}
                                        />
                                        <InputError message={errors.email || emailError || undefined} />
                                    </div>

                                    {/* Submit */}
                                    <Button 
                                        type="submit" 
                                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                                Enviando enlace...
                                            </>
                                        ) : (
                                            'Enviar enlace de restablecimiento'
                                        )}
                                    </Button>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <span className="text-slate-400">¿Recordaste tu contraseña? </span>
                                        <TextLink 
                                            href={login()} 
                                            className="text-blue-400 hover:text-green-400 hover:underline font-medium transition-colors"
                                        >
                                            Iniciar sesión
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-slate-500">
                        <p className="mt-2 text-xs text-slate-600">
                            EduStream - Tu plataforma de aprendizaje en línea
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
