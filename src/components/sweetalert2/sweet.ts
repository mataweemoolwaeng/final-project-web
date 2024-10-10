import Swal from "sweetalert2";
export const sweet_basic = (
  icons?: "success" | "error" | "warning" | "info" | "question",
  title?: string,
  text?: string,
  footer?: string
) => {
  Swal.fire({
    icon: icons,
    title: title,
    text: text,
    footer: footer,
  });
};

export const sweet_popUpTimer = (
  position?:
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end",
  icons?: "success" | "error" | "warning" | "info" | "question",
  title?: string,
  timer?: number
) => {
  Swal.fire({
    position: position,
    icon: icons,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
};

export const sweet_confirm = async (
  icons?: "success" | "error" | "warning" | "info" | "question",
  title?: string,
  text?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  confirmButtonColor?: string,
  cancelButtonColor?: string,
  titleMixin?: string,
  textMixin?: string,
  setValue?: any
) => {
  let status = 0;
  Swal.fire({
    icon: icons,
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: confirmButtonColor ? confirmButtonColor : "#3085d6",
    cancelButtonColor: cancelButtonColor ? cancelButtonColor : "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: titleMixin,
        text: textMixin,
      });
      setTimeout(() => {
        setValue(true);
      }, 1000);
    }
  });
  return status;
};

export const sweet_mixin = async (
  position?:
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end",
  icons?: "success" | "error" | "warning" | "info" | "question",
  title?: string,
  text?: string,
  timer?: number
) => {
  const Toast = Swal.mixin({
    position: position,
    timer: timer,
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icons,
    title: title,
    text: text,
  });
};
