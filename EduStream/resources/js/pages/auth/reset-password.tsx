import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

interface ResetPasswordProps {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validaciones
  const validatePassword = (password: string) => password.length >= 6;

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleBlurPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPasswordError(validatePassword(value) ? null : "La contraseña debe tener al menos 6 caracteres.");
  };

  const handleBlurConfirm = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    setConfirmError(value === password ? null : "Las contraseñas no coinciden.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Head title="Restablecer Contraseña - EduStream" />

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

      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Main */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="card bg-slate-800/90 p-8 shadow-2xl backdrop-blur-sm border border-slate-700/50">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Restablecer Contraseña</h1>
              <p className="text-slate-300">Ingresa tu nueva contraseña para continuar</p>
            </div>

            <Form {...NewPasswordController.store.form()} className="space-y-6">
              {({ processing, errors }) => (
                <>
                  <input type="hidden" name="token" value={token} />
                  <input type="hidden" name="email" value={email} />

                  {/* Password */}
                  <div className="form-control relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      autoComplete="new-password"
                      placeholder="Nueva contraseña"
                      className={`input input-bordered w-full h-12 bg-slate-700/50 text-white placeholder:text-slate-400 pr-12 ${passwordError || errors.password ? "input-error" : ""}`}
                      onBlur={handleBlurPassword}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-slate-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {(errors.password || passwordError) && (
                      <span className="text-red-400 text-sm mt-1">{errors.password || passwordError}</span>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="form-control relative">
                    <input
                      id="password_confirmation"
                      type={showConfirm ? "text" : "password"}
                      name="password_confirmation"
                      required
                      autoComplete="new-password"
                      placeholder="Confirmar contraseña"
                      className={`input input-bordered w-full h-12 bg-slate-700/50 text-white placeholder:text-slate-400 pr-12 ${confirmError || errors.password_confirmation ? "input-error" : ""}`}
                      onBlur={handleBlurConfirm}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-slate-400 hover:text-white"
                      onClick={() => setShowConfirm(!showConfirm)}
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {(errors.password_confirmation || confirmError) && (
                      <span className="text-red-400 text-sm mt-1">{errors.password_confirmation || confirmError}</span>
                    )}
                  </div>

                  {/* Botón */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full h-12 rounded-lg shadow-lg hover:shadow-xl"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                        Guardando...
                      </>
                    ) : (
                      'Restablecer Contraseña'
                    )}
                  </button>
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
