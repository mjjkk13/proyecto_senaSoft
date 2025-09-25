import { logout } from '@/routes';
import { type BreadcrumbItem } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from '@/components/sidebar-admin';
import AddUsuarioModal from '@/components/add-user';
import { route } from 'ziggy-js';
import EditUsuarioModal from '@/components/edit-user';
import ConfirmUsuarioModal from '@/components/delete-modal';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Cell, Legend, Line, Pie, PieChart } from "recharts";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard Admin", href: route('admin.dashboard'), label: undefined },
  { title: "Usuarios", href: route('admin.usuarios.index'), label: undefined },
];

export default function AdminUsuarios() {
  const props = usePage<{
    auth: { user?: { id: number; name: string; email: string } };
    usuarios?: {
      id: number;
      nombre: string;
      email: string;
      rol_id: number;
      rol: { id: number; nombre: string } | null;
      created_at: string;
      updated_at: string;
    }[];
    roles?: { id: number; nombre: string }[];
    stats?: { totalUsuarios: number };
  }>().props;

  const usuarios = props.usuarios ?? [];
  const roles = props.roles ?? [];
  const stats = props.stats ?? { totalUsuarios: 0 };

  const COLORS = ["#3b82f6", "#6366f1", "#f97316", "#10b981", "#ef4444"];

  const usuariosPorRol = roles.map(role => ({
    name: role.nombre,
    count: usuarios.filter(u => u.rol?.id === role.id).length,
  }));

  const usuariosPorMes = Array.from({ length: 12 }, (_, i) => {
    const mes = new Date(0, i).toLocaleString("es", { month: "short" });
    return {
      mes,
      cantidad: usuarios.filter(u => new Date(u.created_at).getMonth() === i).length,
    };
  });

  const usuariosPorRolDonut = usuariosPorRol.map(r => ({
    name: r.name,
    value: r.count
  }));

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <Head title="Gestión de Usuarios - Admin" />

        {/* HEADER */}
        <header className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>
            <nav className="text-sm breadcrumbs mt-1">
              <ul className="flex space-x-2 text-blue-600">
                {breadcrumbs.map((bc, i) => (
                  <li key={i}>
                    <Link href={bc.href} className="hover:underline">
                      {bc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Menú Usuario */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-gray-600" />
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-lg w-52"
            >
              <li className="px-2 py-1 text-sm opacity-80">{props.auth?.user?.name}</li>
              <li>
                <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-100 rounded p-2">
                  <FontAwesomeIcon icon={faUserCircle} /> Perfil
                </Link>
              </li>
              <li>
                <Link
                  href={logout.url()}
                  method="post"
                  as="button"
                  className="flex items-center gap-2 text-red-600 hover:bg-red-100 rounded p-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md space-y-6">

          {/* CRUD Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">Lista de Usuarios</h2>
            <button
              className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() =>
                (document.getElementById('add_usuario_modal') as HTMLDialogElement)?.showModal()
              }
            >
              <FontAwesomeIcon icon={faPlus} /> Nuevo Usuario
            </button>
            <AddUsuarioModal roles={roles} />
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Creado</th>
                  <th className="px-4 py-2">Actualizado</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-2">{usuario.nombre}</td>
                      <td className="px-4 py-2">{usuario.email}</td>
                      <td className="px-4 py-2">{usuario.rol ? usuario.rol.nombre : "Sin rol"}</td>
                      <td className="px-4 py-2">{usuario.created_at}</td>
                      <td className="px-4 py-2">{usuario.updated_at}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          className="btn btn-outline btn-sm gap-2 rounded-xl"
                          onClick={() =>
                            (document.getElementById(`edit_usuario_modal_${usuario.id}`) as HTMLDialogElement)?.showModal()
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} /> Editar
                        </button>
                        <EditUsuarioModal usuario={usuario} roles={roles} />

                        <ConfirmUsuarioModal
                          title="Eliminar usuario"
                          text={`¿Deseas eliminar el usuario "${usuario.nombre}"? Esta acción no se puede deshacer.`}
                          confirmButtonText="Sí, eliminar"
                          cancelButtonText="Cancelar"
                          onConfirm={() => {
                            router.delete(route("admin.usuarios.destroy", usuario.id), {
                              onSuccess: () => router.reload(),
                            });
                          }}
                        >
                          <button className="btn btn-error btn-sm rounded-xl text-white gap-2">
                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                          </button>
                        </ConfirmUsuarioModal>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Dashboard de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

            {/* Total Usuarios */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Usuarios</h3>
              <div className="text-3xl font-bold text-blue-600">{stats.totalUsuarios}</div>
            </div>

            {/* Gráfico de barras */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Usuarios por Rol</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usuariosPorRol}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de líneas */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tendencia de Usuarios</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={usuariosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cantidad" stroke="#6366f1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico donut */}
            <div className="bg-white p-6 rounded-xl shadow-lg col-span-full lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución de Roles</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={usuariosPorRolDonut}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {usuariosPorRolDonut.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}


