import Swal from 'sweetalert2'

function configure(props) {
    return {
      confirmButtonColor: "#1180FF",
      timer: 2000,
      showConfirmButton: false,
    }
}
const Alert = {
    success(message, title, ...rest) {
      Swal.fire({
         title: title ? title : null,
         text: message,
         icon: 'success',
         ...configure(...rest)
       })
    },
    warn(message, title, ...rest) {
      Swal.fire({
         title: title ? title : null,
         text: message,
         icon: 'warning',
         ...configure(...rest)
       })
    },
    error(message, title, ...rest) {
      Swal.fire({
         title: title ? title : null,
         text: message,
         icon: 'error',
         ...configure(...rest)
       })
    },
    info(message, title, ...rest) {
      Swal.fire({
         title: title ? title : null,
         text: message,
         icon: 'info',
         ...configure(...rest)
       })
    },
    question(message, title, ...rest) {
      Swal.fire({
         title: title ? title : null,
         text: message,
         icon: 'question',
         ...configure(...rest)
       })
    }
}
export { Alert }
