import { dashboard, logout } from '@/routes'
import { type BreadcrumbItem } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faUsers, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { BookOpen, CheckCircle, Target } from "lucide-react";
import Sidebar from '@/components/sidebar-admin';
import  AddModal  from '@/components/add-modal';
import EditModal from '@/components/edit-modal';
import ConfirmModal from '@/components/delete-modal';
import { route } from 'ziggy-js';


const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Admin", href: dashboard.url(), label: undefined },
];

export default function AdminDashboard() {
  const props = usePage<{
    auth: {
      user?: {
        id: number
        name: string
        email: string
      }
    }
    cursos?: {
      descripcion: string;
      id: number;
      title: string;
      students_count: number;
      img_url: string;
      completedLessons?: number;
      totalLessons?: number;
    }[];
    stats?: { totalCursos: number; totalInscritos: number; totalUsuarios: number; cursosPopulares: string[] };
    usuariosRecientes?: { id: number; nombre: string; registradoHace: string }[];
  }>().props;

  const cursos = props.cursos ?? [];
  const stats = props.stats ?? { totalCursos: 0, totalInscritos: 0, totalUsuarios: 0, cursosPopulares: [] };
  const usuariosRecientes = props.usuariosRecientes ?? [];

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <Head title="Dashboard Admin - EduStream" />

        {/* Header con breadcrumbs y menú usuario */}
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <nav className="text-sm breadcrumbs">
              <ul>
                {breadcrumbs.map((bc, i) => (
                  <li key={i}>
                    <Link href={bc.href}>{bc.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Menú Usuario */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-2xl text-gray-600 dark:text-gray-200"
              />
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="px-2 py-1 text-sm opacity-70">
                {props.auth?.user?.name ?? "Usuario"}
              </li>
              <li>
                <Link href="/profile" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUserCircle} /> Perfil
                </Link>
              </li>
              <li>
                <Link
                  href={logout.url()}
                  method="post"
                  as="button"
                  className="flex items-center gap-2 text-red-600"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        </header>

        {/* Contenedor principal */}
        <div className="flex flex-col gap-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-6 rounded-xl shadow-lg">
          {/* Bienvenida */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-xl shadow-lg text-white">
            <div>
              <h1 className="text-2xl font-bold mb-1">Bienvenido, Admin</h1>
              <p className="text-blue-100">Aquí puedes gestionar tus cursos y usuarios</p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Total Cursos */}
            <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-lg border border-base-300 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm opacity-70">Cursos</p>
                <p className="text-xl font-bold">{stats.totalCursos}</p>
              </div>
            </div>

            {/* Total Usuarios */}
            <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-lg border border-base-300 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm opacity-70">Usuarios</p>
                <p className="text-xl font-bold">{stats.totalUsuarios}</p>
              </div>
            </div>

            {/* Cursos Populares */}
            <div className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-lg border border-base-300 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm opacity-70">Cursos Populares</p>
                <p className="text-xl font-bold">{stats.cursosPopulares?.length ?? 0}</p>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cursos */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestión de Cursos</h2>
                <button
                  className="btn btn-primary btn-sm md:btn-md gap-2 rounded-xl shadow"
                   onClick={() =>
                    (document.getElementById('add_modal') as HTMLDialogElement)?.showModal()
                  }
                >
                  <FontAwesomeIcon icon={faPlus} /> Nuevo Curso
                </button>
                 <AddModal />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cursos.length === 0 && (
                  <div className="col-span-full text-center opacity-70">
                    No hay cursos disponibles todavía.
                  </div>
                )}
              {cursos.map((course) => {
                const progress =
                  course.completedLessons && course.totalLessons
                    ? (course.completedLessons / course.totalLessons) * 100
                    : 0;

                return (
                  <div key={course.id} className="card ...">
                    <figure className="relative">
                      <img
                        src={`${course.img_url}`}  
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 w-full bg-black/30 h-2">
                          <div
                            className="bg-green-500 h-2 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-lg">{course.title}</h2>
                      <p className="text-sm opacity-80">{course.students_count} inscritos</p>
                      {course.completedLessons && course.totalLessons && (
                        <span className="badge badge-accent text-xs mt-1">
                          {course.completedLessons} / {course.totalLessons} lecciones
                        </span>
                      )}
                      <div className="card-actions justify-between mt-3 gap-2">
                        {/* Botón Editar */}
                        <button
                          className="btn btn-outline btn-primary btn-sm rounded-xl gap-2"
                          onClick={() =>
                            (document.getElementById(`edit_modal_${course.id}`) as HTMLDialogElement)?.showModal()
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} /> Editar
                        </button>
                        <EditModal
                          curso={{
                            id: course.id,
                            nombre: course.title,
                            descripcion: course.descripcion || '',
                            img_url: course.img_url,
                          }}
                        />

                        {/* Botón Eliminar */}
                        <ConfirmModal
                          title="Eliminar curso"
                          text={`¿Deseas eliminar el curso "${course.title}"? Esta acción no se puede deshacer.`}
                          confirmButtonText="Sí, eliminar"
                          cancelButtonText="Cancelar"
                          onConfirm={() => {
                            router.delete(route('admin.cursos.destroy', course.id), {
                              onSuccess: () => {
                                router.reload(); // fuerza la recarga del dashboard
                              },
                            });
                          }}
                        >
                          <button className="btn btn-error btn-sm rounded-xl text-white gap-2">
                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                          </button>
                        </ConfirmModal>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Usuarios recientes */}
            <div className="space-y-6">
              <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-base-300">
                <h2 className="text-lg font-bold mb-4">Usuarios Recientes</h2>
                <div className="space-y-3">
                  {usuariosRecientes.length > 0 ? (
                    usuariosRecientes.map((usuario) => (
                      <div key={usuario.id} className="flex items-center space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{usuario.nombre}</p>
                          <p className="text-xs opacity-70">{usuario.registradoHace}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-center opacity-70">No hay usuarios recientes.</p>
                  )}
                </div>
              </div>

              {/* Stats rápidas */}
              <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-base-300">
                <h2 className="text-lg font-bold mb-4">Estadísticas rápidas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-base-200 rounded-xl p-4">
                  <div className="stat">
                    <div className="stat-title truncate">Cursos</div>
                    <div className="stat-value text-primary">{stats.totalCursos}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title truncate">Inscritos</div>
                    <div className="stat-value text-secondary">{stats.totalInscritos}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title truncate">Usuarios</div>
                    <div className="stat-value text-accent">{stats.totalUsuarios}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
