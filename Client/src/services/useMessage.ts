import Swal from 'sweetalert2';

export function useMessage() {
  const showMessage = (message: string, isError: boolean) => {
    Swal.fire({
      position: 'center',
      icon: isError ? 'error' : 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return { showMessage };
}