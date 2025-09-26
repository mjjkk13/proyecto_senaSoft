import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { PageProps } from "@/types/inertia";
import {route} from "ziggy-js";

// eslint-disable-next-line no-empty-pattern
export default function PasswordSettings({}: PageProps) {
  const { data, setData, put, processing, errors } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleSave = () => {
    put(route("ajustes.contraseña.update"), {
      onSuccess: () =>
        Swal.fire({
          icon: "success",
          title: "Guardado",
          text: "Tu contraseña ha sido actualizada correctamente.",
          confirmButtonText: "Aceptar",
        }),
      onError: () =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar la contraseña.",
          confirmButtonText: "Aceptar",
        }),
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cambiar Contraseña</h1>
      <p className="text-sm text-gray-500 mb-6">
        Aquí puedes cambiar tu contraseña para mantener tu cuenta segura.
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label className="label">Contraseña actual</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={data.current_password}
            onChange={(e) => setData("current_password", e.target.value)}
          />
          {errors.current_password && (
            <p className="text-red-500 text-sm">{errors.current_password}</p>
          )}
        </div>

        <div>
          <label className="label">Nueva contraseña</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="label">Confirmar nueva contraseña</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={processing}>
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
}
