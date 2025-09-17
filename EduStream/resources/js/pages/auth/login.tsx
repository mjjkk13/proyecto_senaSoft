import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    // Validaciones básicas
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (!validateEmail(value)) {
            setEmailError("Por favor ingresa un correo válido.");
        } else {
            setEmailError(null);
        }
    };

    const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (!validatePassword(value)) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres.");
        } else {
            setPasswordError(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <Head title="Iniciar Sesión - EduStream" />
            
            {/* Header */}
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
                            <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
                            <p className="text-slate-300">Bienvenido de vuelta a EduStream</p>
                        </div>

                        <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']} className="space-y-6">
                            {({ processing, errors }) => (
                                <>
                                    {/* Status */}
                                    {status && (
                                        <div className="rounded-lg bg-green-900/50 border border-green-600 p-3 text-sm text-green-200">
                                            {status}
                                        </div>
                                    )}

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="Correo electrónico"
                                            className={`h-12 bg-slate-700/50 border ${emailError || errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"} text-white placeholder:text-slate-400 rounded-lg`}
                                            onBlur={handleBlurEmail}
                                        />
                                        <InputError message={errors.email || emailError || undefined} />
                                    </div>

                                    {/* Password con toggle */}
                                    <div className="space-y-2 relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Contraseña"
                                            className={`h-12 bg-slate-700/50 border ${passwordError || errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"} text-white placeholder:text-slate-400 rounded-lg pr-12`}
                                            onBlur={handleBlurPassword}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                        <InputError message={errors.password || passwordError || undefined} />
                                    </div>

                                    {/* Remember + Reset */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="remember" 
                                                name="remember" 
                                                tabIndex={3}
                                                className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <Label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer">
                                                Recordarme
                                            </Label>
                                        </div>
                                        {canResetPassword && (
                                            <TextLink 
                                                href={request()} 
                                                className="text-sm text-slate-400 hover:text-blue-400 transition-colors" 
                                                tabIndex={5}
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </TextLink>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <Button 
                                        type="submit" 
                                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                                        tabIndex={4} 
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                                Iniciando sesión...
                                            </>
                                        ) : (
                                            'Iniciar Sesión'
                                        )}
                                    </Button>

                                    {/* Sign Up */}
                                    <div className="text-center">
                                        <span className="text-slate-400">¿Nuevo en EduStream? </span>
                                        <TextLink 
                                            href={register()} 
                                            className="text-blue-400 hover:text-green-400 hover:underline font-medium transition-colors" 
                                            tabIndex={5}
                                        >
                                            Regístrate ahora
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
