import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
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
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmailError(validateEmail(value) ? null : "Por favor ingresa un correo válido.");
  };

  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPasswordError(validatePassword(value) ? null : "La contraseña debe tener al menos 6 caracteres.");
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
                    <div className="alert alert-success text-sm">
                      {status}
                    </div>
                  )}

                  {/* Email */}
                  <div className="form-control">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      autoFocus
                      tabIndex={1}
                      autoComplete="email"
                      placeholder="Correo electrónico"
                      className={`input input-bordered w-full h-12 bg-slate-700/50 text-white placeholder:text-slate-400 ${emailError || errors.email ? "input-error" : ""}`}
                      onBlur={handleBlurEmail}
                    />
                    {(errors.email || emailError) && (
                      <span className="text-red-400 text-sm mt-1">{errors.email || emailError}</span>
                    )}
                  </div>

                  {/* Password con toggle */}
                  <div className="form-control relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                      placeholder="Contraseña"
                      className={`input input-bordered w-full h-12 bg-slate-700/50 text-white placeholder:text-slate-400 pr-12 ${passwordError || errors.password ? "input-error" : ""}`}
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
                    {(errors.password || passwordError) && (
                      <span className="text-red-400 text-sm mt-1">{errors.password || passwordError}</span>
                    )}
                  </div>

                  {/* Remember + Reset */}
                  <div className="flex items-center justify-between">
                    <label className="label cursor-pointer flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        name="remember" 
                        tabIndex={3}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text text-slate-300">Recordarme</span>
                    </label>
                    {canResetPassword && (
                      <Link 
                        href={request()} 
                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors" 
                        tabIndex={5}
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    )}
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full h-12 rounded-lg shadow-lg hover:shadow-xl"
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
                  </button>

                  {/* Sign Up */}
                  <div className="text-center">
                    <span className="text-slate-400">¿Nuevo en EduStream? </span>
                    <Link 
                      href={register()} 
                      className="text-blue-400 hover:text-green-400 hover:underline font-medium transition-colors" 
                      tabIndex={5}
                    >
                      Regístrate ahora
                    </Link>
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
