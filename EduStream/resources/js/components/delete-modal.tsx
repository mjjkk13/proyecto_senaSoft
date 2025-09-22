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

export default function ConfirmModal({
  children,
  title = "¿Estás seguro?",
  text = "¡No podrás revertir esta acción!",
  confirmButtonText = "Sí, confirmar",
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
