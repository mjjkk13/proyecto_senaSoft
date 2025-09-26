import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faPalette } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {route} from "ziggy-js";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<"appearance" | "password" | "profile">("appearance");

  const { data, setData, patch, processing, errors } = useForm({
    name: "",
    email: "",
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleSave = () => {
    let routeName = "";

    if (activeTab === "profile") {
      routeName = route("ajustes.perfil.update");
    } else if (activeTab === "password") {
      routeName = route("ajustes.contraseña.update");
    } else {
      Swal.fire("Guardado", "Tus cambios han sido guardados exitosamente.", "success");
      return;
    }

    patch(routeName, {
      onSuccess: () =>
        Swal.fire({
          icon: "success",
          title: "Guardado",
          text: "Tus cambios han sido guardados exitosamente.",
          confirmButtonText: "Aceptar",
        }),
      onError: () =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los cambios.",
          confirmButtonText: "Aceptar",
        }),
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Head title="Ajustes de perfil" />

      <h1 className="text-2xl font-bold mb-2">Ajustes de perfil</h1>
      <p className="text-sm text-gray-500 mb-6">Configura tu perfil, apariencia y contraseña.</p>

      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6 flex space-x-4">
        <button
          className={`tab ${activeTab === "appearance" && "tab-active"}`}
          onClick={() => setActiveTab("appearance")}
        >
          <FontAwesomeIcon icon={faPalette} className="mr-2" /> Apariencia
        </button>

        <button
          className={`tab ${activeTab === "password" && "tab-active"}`}
          onClick={() => setActiveTab("password")}
        >
          <FontAwesomeIcon icon={faLock} className="mr-2" /> Contraseña
        </button>

        <button
          className={`tab ${activeTab === "profile" && "tab-active"}`}
          onClick={() => setActiveTab("profile")}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" /> Perfil
        </button>
      </div>

      {/* Card */}
      <div className="card bg-base-100 shadow-lg border border-base-300 rounded-lg p-6">
        {/* Apariencia */}
        {activeTab === "appearance" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Configuración de Apariencia</h2>
            <ThemeSwitcher />
            <div>
              <h3 className="font-semibold">Fuentes</h3>
              <p className="text-sm text-gray-500">Aquí puedes personalizar las fuentes (pendiente implementar).</p>
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
              Guardar Apariencia
            </button>
          </div>
        )}

        {/* Contraseña */}
        {activeTab === "password" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Cambiar contraseña</h2>
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
                {errors.current_password && <p className="text-red-500 text-sm">{errors.current_password}</p>}
              </div>

              <div>
                <label className="label">Nueva contraseña</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div>
                <label className="label">Confirmar contraseña</label>
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
        )}

        {/* Perfil */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Actualizar perfil</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div>
                <label className="label">Nombre</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="label">Correo electrónico</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <button type="submit" className="btn btn-primary" disabled={processing}>
                Guardar perfil
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
