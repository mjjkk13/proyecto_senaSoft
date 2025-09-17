import {login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenido a EduStream">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                </div>
                
                <div className="relative flex min-h-screen flex-col items-center p-6 text-white lg:justify-center lg:p-8">
                    <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                        <nav className="flex items-center justify-between">
                            {/* EduStream Logo */}
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-green-500 md:h-12 md:w-12">
                                    <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6 text-white md:h-7 md:w-7"/>
                                </div>
                                <span className="text-2xl font-bold md:text-3xl">
                                    <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Edu</span>
                                    <span className="text-white">Stream</span>
                                </span>
                            </Link>
                            <div className="flex items-center gap-4">
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-lg border border-transparent px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-200"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </>
                            </div>
                            </nav>
                    </header>
                    
                    <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                        <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                            <div className="flex-1 rounded-xl bg-slate-800/90 p-6 pb-12 text-sm leading-relaxed shadow-2xl backdrop-blur-sm border border-slate-700/50 lg:rounded-tl-xl lg:rounded-br-none lg:p-20">
                                <h1 className="mb-4 text-3xl font-bold text-white">¡Bienvenido a EduStream!</h1>
                                <p className="mb-6 text-slate-300 text-lg">
                                    Tu plataforma de aprendizaje en línea donde puedes acceder a cursos, 
                                    tutoriales y recursos educativos de alta calidad.
                                </p>
                                <ul className="mb-6 flex flex-col space-y-4">
                                    <li className="relative flex items-center gap-4 py-3 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-blue-500/30">
                                        <span className="relative bg-slate-800/90 py-1">
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-500 bg-gradient-to-br from-blue-500 to-green-500">
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            </span>
                                        </span>
                                        <span className="text-slate-300">
                                            Accede a Cursos Interactivos
                                        </span>
                                    </li>
                                    <li className="relative flex items-center gap-4 py-3 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-blue-500/30">
                                        <span className="relative bg-slate-800/90 py-1">
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-500 bg-gradient-to-br from-blue-500 to-green-500">
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            </span>
                                        </span>
                                        <span className="text-slate-300">
                                            Aprende con Tutoriales en Video
                                        </span>
                                    </li>
                                </ul>
                                <div className="flex gap-3 text-sm leading-normal">
                                    {!auth.user && (
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 text-sm font-medium text-white hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Comenzar Ahora
                                        </Link>
                                    )}
                                </div>
                            </div>
                            
                            <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-xl bg-gradient-to-br from-blue-900/20 to-green-900/20 lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-xl">
                                {/* Educational Illustration */}
                                <div className="flex h-full w-full items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500">
                                            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-white">Aprende sin Límites</h3>
                                        <p className="text-slate-300 text-sm">
                                            Accede a contenido educativo de calidad desde cualquier lugar
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-8 right-8 h-8 w-8 rounded-full bg-blue-500/30 animate-pulse"></div>
                                <div className="absolute bottom-12 left-8 h-6 w-6 rounded-full bg-green-500/30 animate-pulse delay-1000"></div>
                                <div className="absolute top-1/2 left-4 h-4 w-4 rounded-full bg-blue-400/40 animate-pulse delay-500"></div>
                            </div>
                        </main>
                    </div>
                    <div className="hidden h-14.5 lg:block"></div>
                </div>
            </div>
        </>
    );
}
