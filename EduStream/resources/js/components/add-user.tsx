import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

interface Rol {
  id: number;
  nombre: string;
}

interface AddUsuarioModalProps {
  roles: Rol[];
}

type FormState = {
  nombre: string;
  email: string;
  password: string;
  rol_id: number | ""; // permite vacío antes de seleccionar
};

export default function AddUsuarioModal({ roles }: AddUsuarioModalProps) {
  const form = useForm<FormState>({
    nombre: "",
    email: "",
    password: "",
    rol_id: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", form.data.nombre);
    formData.append("email", form.data.email);
    formData.append("password", form.data.password);
    formData.append("rol_id", String(form.data.rol_id));

    form.post(route("admin.usuarios.store"), {
      onSuccess: () => {
        (document.getElementById("add_usuario_modal") as HTMLDialogElement)?.close();
        form.reset();
      },
    });
  }

  function closeModal() {
    (document.getElementById("add_usuario_modal") as HTMLDialogElement)?.close();
    form.reset();
  }

  return (
    <dialog id="add_usuario_modal" className="modal">
      <form
        onSubmit={submit}
        className="modal-box max-w-lg w-full flex flex-col gap-4"
      >
        <h3 className="font-bold text-xl text-center">Agregar nuevo usuario</h3>

        {/* Nombre */}
        <div className="form-control w-full">
          <label htmlFor="nombre" className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            id="nombre"
            value={form.data.nombre}
            onChange={(e) => form.setData("nombre", e.target.value)}
            placeholder="Ingrese el nombre del usuario"
            className={`input input-bordered w-full ${form.errors.nombre ? "input-error" : ""}`}
            required
          />
          {form.errors.nombre && (
            <span className="text-error text-sm mt-1">{form.errors.nombre}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            value={form.data.email}
            onChange={(e) => form.setData("email", e.target.value)}
            placeholder="Ingrese el email"
            className={`input input-bordered w-full ${form.errors.email ? "input-error" : ""}`}
            required
          />
          {form.errors.email && (
            <span className="text-error text-sm mt-1">{form.errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="form-control w-full">
          <label htmlFor="password" className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            type="password"
            id="password"
            value={form.data.password}
            onChange={(e) => form.setData("password", e.target.value)}
            placeholder="Ingrese la contraseña"
            className={`input input-bordered w-full ${form.errors.password ? "input-error" : ""}`}
            required
          />
          {form.errors.password && (
            <span className="text-error text-sm mt-1">{form.errors.password}</span>
          )}
        </div>

        {/* Rol */}
        <div className="form-control w-full">
          <label htmlFor="rol_id" className="label">
            <span className="label-text">Rol</span>
          </label>
          <select
            id="rol_id"
            value={form.data.rol_id}
            onChange={(e) =>
              form.setData("rol_id", e.target.value ? Number(e.target.value) : "")
            }
            className={`select select-bordered w-full ${form.errors.rol_id ? "select-error" : ""}`}
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={form.processing}
          >
            {form.processing ? "Guardando…" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={closeModal}
            disabled={form.processing}
          >
            Cerrar
          </button>
        </div>
      </form>
    </dialog>
  );
}
