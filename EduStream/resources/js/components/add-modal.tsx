import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';

export default function AddCursoModal() {
  const form = useForm({
    nombre: '',
    descripcion: '',
    imagen: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    form.post(route('admin.cursos.store'), {
      forceFormData: true, // importante para subir archivos
      onSuccess: () => {
        (document.getElementById('add_modal') as HTMLDialogElement)?.close();
        form.reset();
        setPreview(null);
      },
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    form.setData('imagen', file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  function removeFile() {
    form.setData('imagen', null);
    setPreview(null);
    const fileInput = document.getElementById('imagen') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
  }

  return (
    <dialog id="add_modal" className="modal">
      <form
        onSubmit={submit}
        className="modal-box max-w-lg w-full flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <h3 className="font-bold text-xl text-center">Agregar nuevo curso</h3>

        {/* Nombre */}
        <div className="form-control w-full">
          <label htmlFor="nombre" className="label">
            <span className="label-text">Nombre del curso</span>
          </label>
          <input
            type="text"
            id="nombre"
            value={form.data.nombre}
            onChange={e => form.setData('nombre', e.target.value)}
            placeholder="Ingrese el nombre del curso"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Descripción */}
        <div className="form-control w-full">
          <label htmlFor="descripcion" className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            id="descripcion"
            value={form.data.descripcion}
            onChange={e => form.setData('descripcion', e.target.value)}
            placeholder="Describe el curso"
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>

        {/* Imagen */}
        <div className="form-control w-full">
          <label htmlFor="imagen" className="label">
            <span className="label-text">Imagen del curso</span>
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              id="imagen"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />

            {/* Previsualización */}
            {preview && (
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={preview}
                  alt="Vista previa"
                  className="w-32 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-error"
                  onClick={removeFile}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="modal-action justify-between">
          <button type="submit" className="btn btn-primary" disabled={form.processing}>
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              (document.getElementById('add_modal') as HTMLDialogElement)?.close();
              form.reset();
              setPreview(null);
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </dialog>
  );
}
