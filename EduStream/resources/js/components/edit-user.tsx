import { useForm, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useEffect } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol_id: number;
  rol: { id: number; nombre: string } | null;
}

interface Rol {
  id: number;
  nombre: string;
}

interface Props {
  usuario: Usuario;
  roles: Rol[];
}

type FormState = {
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
};

export default function EditUsuarioModal({ usuario, roles }: Props) {
  const form = useForm<FormState>({
    nombre: usuario.nombre,
    email: usuario.email,
    password: '',
    rol_id: usuario.rol_id,
  });

  const modalId = `edit_usuario_modal_${usuario.id}`;
  const nombreId = `nombre_usuario_${usuario.id}`;
  const emailId = `email_usuario_${usuario.id}`;
  const passwordId = `password_usuario_${usuario.id}`;
  const rolId = `rol_usuario_${usuario.id}`;

  useEffect(() => {
    form.setData({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol_id: usuario.rol_id,
    });
  }, [usuario]);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', form.data.nombre);
    formData.append('email', form.data.email);
    formData.append('rol_id', String(form.data.rol_id));

    if (form.data.password) {
      formData.append('password', form.data.password);
    }

    formData.append('_method', 'PUT');

    router.post(route('admin.usuarios.update', usuario.id), formData, {
      preserveScroll: false,
      preserveState: false,
      onSuccess: () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        if (modal) modal.close();
        form.clearErrors();
        router.reload();
      },
      onError: (errors) => {
        console.error('Errores del formulario:', errors);
      },
    });
  }

  function closeModal() {
    form.setData({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol_id: usuario.rol_id,
    });
    form.clearErrors();
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.close();
  }

  return (
    <dialog id={modalId} className="modal">
      <form
        onSubmit={submit}
        className="modal-box max-w-lg w-full flex flex-col gap-4"
      >
        <h3 className="font-bold text-xl text-center">Editar usuario</h3>

        {/* Nombre */}
        <div className="form-control w-full">
          <label htmlFor={nombreId} className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            name="nombre"
            type="text"
            id={nombreId}
            value={form.data.nombre}
            onChange={(e) => form.setData('nombre', e.target.value)}
            className={`input input-bordered w-full ${form.errors.nombre ? 'input-error' : ''}`}
            required
          />
          {form.errors.nombre && (
            <span className="text-error text-sm mt-1">{form.errors.nombre}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label htmlFor={emailId} className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            id={emailId}
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
            className={`input input-bordered w-full ${form.errors.email ? 'input-error' : ''}`}
            required
          />
          {form.errors.email && (
            <span className="text-error text-sm mt-1">{form.errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="form-control w-full">
          <label htmlFor={passwordId} className="label">
            <span className="label-text">Contraseña (dejar vacío para no cambiar)</span>
          </label>
          <input
            name="password"
            type="password"
            id={passwordId}
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
            className={`input input-bordered w-full ${form.errors.password ? 'input-error' : ''}`}
          />
          {form.errors.password && (
            <span className="text-error text-sm mt-1">{form.errors.password}</span>
          )}
        </div>

        {/* Rol */}
        <div className="form-control w-full">
          <label htmlFor={rolId} className="label">
            <span className="label-text">Rol</span>
          </label>
          <select
            id={rolId}
            value={form.data.rol_id}
            onChange={(e) => form.setData('rol_id', Number(e.target.value))}
            className="select select-bordered w-full"
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>

          {form.errors.rol_id && (
            <span className="text-error text-sm mt-1">{form.errors.rol_id}</span>
          )}
        </div>

        {/* Botones */}
        <div className="modal-action justify-between">
          <button type="submit" className="btn btn-primary" disabled={form.processing}>
            {form.processing ? 'Guardando…' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={closeModal} disabled={form.processing}>
            Cerrar
          </button>
        </div>
      </form>
    </dialog>
  );
}
