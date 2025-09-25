import { ReactNode } from "react";
import Swal from "sweetalert2";

type Props = {
  children: ReactNode;
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
};

export default function ConfirmUsuarioModal({
  children,
  title = "¿Estás seguro de eliminar este usuario?",
  text = "¡Esta acción no se puede revertir!",
  confirmButtonText = "Sí, eliminar usuario",
  cancelButtonText = "Cancelar",
  onConfirm,
}: Props) {
  const open = () => {
    Swal.fire({
      title,
      text,
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
