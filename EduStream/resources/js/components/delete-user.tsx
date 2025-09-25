import { ReactNode } from "react";
import Swal from "sweetalert2";

type ConfirmUsuarioModalProps = {
  children: ReactNode;
  usuarioNombre?: string; // opcional: mostrar el nombre del usuario en el modal
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
};

export default function ConfirmUsuarioModal({
  children,
  usuarioNombre,
  title,
  text,
  confirmButtonText = "Sí, eliminar usuario",
  cancelButtonText = "Cancelar",
  onConfirm,
}: ConfirmUsuarioModalProps) {
  const open = () => {
    Swal.fire({
      title: title || `¿Estás seguro de eliminar a ${usuarioNombre ?? "este usuario"}?`,
      text: text || "¡Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText,
      cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  return <span onClick={open}>{children}</span>;
}
