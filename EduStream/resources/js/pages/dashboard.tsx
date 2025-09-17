import { Head, Link, usePage } from '@inertiajs/react'
import { edit as editProfile } from '@/routes/profile'
import { create, edit, destroy } from '@/routes/cursos'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"

export default function Dashboard() {
  const props = usePage<{
    cursos?: { id: number; title: string; students_count: number; img_url: string }[]
    stats?: { totalCursos: number; totalInscritos: number }
  }>().props
  const cursos = props.cursos ?? []
  const stats = props.stats ?? { totalCursos: 0, totalInscritos: 0 }

  return (
    <>
      <Head title="Dashboard - EduStream" />
      <div className="min-h-screen bg-base-200 flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-md px-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary">EduStream Dashboard</h1>
          </div>
          <div className="flex-none flex items-center gap-3">
            <Link href={create.url()} className="btn btn-primary btn-sm md:btn-md gap-2 rounded-xl shadow">
              <FontAwesomeIcon icon={faPlus} /> Nuevo Curso
            </Link>
            <Link href={editProfile.url()} className="btn btn-ghost btn-sm md:btn-md rounded-xl border border-primary text-primary hover:bg-primary hover:text-white">
              <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>
          </div>
        </div>

        {/* Cursos tipo Netflix */}
        <div className="p-6 flex-1">
          <h2 className="text-xl font-semibold mb-4 text-base-content">Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cursos.map((course) => (
              <div 
                key={course.id} 
                className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 border border-base-300 rounded-xl"
              >
                <figure>
                  <img 
                    src={course.img_url} 
                    alt={course.title} 
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg">{course.title}</h2>
                  <p className="text-sm opacity-80">{course.students_count} inscritos</p>
                  <div className="card-actions justify-end mt-3 gap-2">
                    <Link 
                      href={edit.url(course.id)} 
                      className="btn btn-outline btn-primary btn-sm rounded-xl gap-2"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </Link>
                    <Link
                      method="delete"
                      href={destroy.url(course.id)}
                      as="button"
                      className="btn btn-error btn-sm rounded-xl text-white gap-2"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {cursos.length === 0 && (
              <div className="col-span-full text-center text-base-content opacity-70">
                No hay cursos disponibles todavía.
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="p-6 bg-base-100 border-t border-base-300">
          <h2 className="text-xl font-semibold mb-4 text-base-content">Estadísticas rápidas</h2>
          <div className="stats shadow bg-base-200 text-base-content rounded-xl">
            <div className="stat">
              <div className="stat-title">Cursos</div>
              <div className="stat-value text-primary">{stats.totalCursos}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Inscritos</div>
              <div className="stat-value text-secondary">{stats.totalInscritos}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
