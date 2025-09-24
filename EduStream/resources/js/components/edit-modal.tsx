import { useForm, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState, useEffect } from 'react';

interface Curso {
  id: number;
  nombre: string;
  descripcion?: string;
  img_url?: string;
}

interface Props {
  curso: Curso;
}

type FormState = {
  nombre: string;
  descripcion: string;
  imagen: File | null;
};

export default function EditModal({ curso }: Props) {
  const form = useForm<FormState>({
    nombre: curso.nombre,
    descripcion: curso.descripcion || '',
    imagen: null,
  });

  const [preview, setPreview] = useState<string | null>(curso.img_url || null);

  const modalId = `edit_modal_${curso.id}`;
  const nombreId = `nombre_${curso.id}`;
  const descripcionId = `descripcion_${curso.id}`;
  const imagenId = `imagen_${curso.id}`;

  // Cuando cambie el curso (props), sincroniza todo el form
  useEffect(() => {
    form.setData({
      nombre: curso.nombre,
      descripcion: curso.descripcion || '', // CORRECCIÓN: Maneja valores undefined
      imagen: null,
    });
    setPreview(curso.img_url || null);
  }, [curso]);

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', form.data.nombre);
    formData.append('descripcion', form.data.descripcion);
    formData.append('_method', 'PUT');

    if (form.data.imagen instanceof File) {
      formData.append('imagen', form.data.imagen);
    }

    router.post(route('admin.cursos.update', curso.id), formData, {
      preserveScroll: false,
      preserveState: false,
      onSuccess: () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        if (modal) modal.close();

        const fileInput = document.getElementById(imagenId) as HTMLInputElement | null;
        if (fileInput) fileInput.value = '';

        form.clearErrors();
        
        // CORRECCIÓN: Forzar recarga para actualizar la vista
        router.reload();
      },
      onError: (errors) => {
        console.error('Errores del formulario:', errors);
      },
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    form.setData('imagen', file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(curso.img_url || null);
    }
  }

  function removeFile() {
    form.setData('imagen', null);
    setPreview(null);
    const fileInput = document.getElementById(imagenId) as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
  }

  function closeModal() {
    form.setData({
      nombre: curso.nombre,
      descripcion: curso.descripcion || '',
      imagen: null,
    });
    form.clearErrors();
    setPreview(curso.img_url || null);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.close();
  }

  return (
    <dialog id={modalId} className="modal">
      <form
        onSubmit={submit}
        className="modal-box max-w-lg w-full flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <h3 className="font-bold text-xl text-center">Editar curso</h3>

        {/* Nombre */}
        <div className="form-control w-full">
          <label htmlFor={nombreId} className="label">
            <span className="label-text">Nombre del curso</span>
          </label>
          <input
            name="nombre"
            type="text"
            id={nombreId}
            value={form.data.nombre}
            onChange={(e) => form.setData('nombre', e.target.value)}
            placeholder="Ingrese el nombre del curso"
            className={`input input-bordered w-full ${form.errors.nombre ? 'input-error' : ''}`}
            required
          />
          {form.errors.nombre && (
            <span className="text-error text-sm mt-1">{form.errors.nombre}</span>
          )}
        </div>

        {/* Descripción */}
        <div className="form-control w-full">
          <label htmlFor={descripcionId} className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            name="descripcion"
            id={descripcionId}
            value={form.data.descripcion}
            onChange={(e) => form.setData('descripcion', e.target.value)}
            placeholder="Describe el curso"
            className={`textarea textarea-bordered w-full ${form.errors.descripcion ? 'textarea-error' : ''}`}
            rows={4}
          />
          {form.errors.descripcion && (
            <span className="text-error text-sm mt-1">{form.errors.descripcion}</span>
          )}
        </div>

        {/* Imagen */}
        <div className="form-control w-full">
          <label htmlFor={imagenId} className="label">
            <span className="label-text">Imagen del curso</span>
          </label>
          <div className="flex flex-col gap-2">
            <input
              name="imagen"
              type="file"
              id={imagenId}
              accept="image/*"
              onChange={handleFileChange}
              className={`file-input file-input-bordered w-full ${form.errors.imagen ? 'file-input-error' : ''}`}
            />
            {form.errors.imagen && (
              <span className="text-error text-sm">{form.errors.imagen}</span>
            )}

            {/* Previsualización */}
            {preview && (
              <div className="flex items-center gap-2">
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