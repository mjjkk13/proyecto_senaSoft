import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // --- Validaciones ---
    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) => password.length >= 6;

    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmError, setConfirmError] = useState<string | null>(null);

    const [passwordValue, setPasswordValue] = useState("");

    const handleBlurName = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value.trim()) {
            setNameError("El nombre es obligatorio.");
        } else {
            setNameError(null);
        }
    };

    const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!validateEmail(e.target.value.trim())) {
            setEmailError("Por favor ingresa un correo válido.");
        } else {
            setEmailError(null);
        }
    };

    const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setPasswordValue(value);
        if (!validatePassword(value)) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres.");
        } else {
            setPasswordError(null);
        }
    };

    const handleBlurConfirm = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim() !== passwordValue) {
            setConfirmError("Las contraseñas no coinciden.");
        } else {
            setConfirmError(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
            <Head title="Registrarse - EduStream" />
            
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
                            <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
                            <p className="text-slate-300">Únete a EduStream y comienza tu aprendizaje</p>
                        </div>

                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Input
                                            id="nombre"
                                            type="text"
                                            name="nombre"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            placeholder="Nombre completo"
                                            className={`h-12 bg-slate-700/50 border ${nameError || errors.nombre ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"} text-white placeholder:text-slate-400 rounded-lg`}
                                            onBlur={handleBlurName}
                                        />
                                        <InputError message={errors.nombre || nameError || undefined} />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            placeholder="Correo electrónico"
                                            className={`h-12 bg-slate-700/50 border ${emailError || errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"} text-white placeholder:text-slate-400 rounded-lg`}
                                            onBlur={handleBlurEmail}
                                        />
                                        <InputError message={errors.email || emailError || undefined} />
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2 relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
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

                                    {/* Confirm Password */}
                                    <div className="space-y-2 relative">
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            placeholder="Confirmar contraseña"
                                            className={`h-12 bg-slate-700/50 border ${confirmError || errors.password_confirmation ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"} text-white placeholder:text-slate-400 rounded-lg pr-12`}
                                            onBlur={handleBlurConfirm}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                        <InputError message={errors.password_confirmation || confirmError || undefined} />
                                    </div>

                                    {/* Submit */}
                                    <Button 
                                        type="submit" 
                                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                                        tabIndex={5} 
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                                Creando cuenta...
                                            </>
                                        ) : (
                                            'Crear Cuenta'
                                        )}
                                    </Button>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <span className="text-slate-400">¿Ya tienes una cuenta? </span>
                                        <TextLink 
                                            href={login()} 
                                            className="text-blue-400 hover:text-green-400 hover:underline font-medium transition-colors" 
                                            tabIndex={6}
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
