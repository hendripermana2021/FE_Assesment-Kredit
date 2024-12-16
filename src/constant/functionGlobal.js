import Swal from 'sweetalert2';

export function formatRupiah(value) {
  // Ensure the value is a number, and fix any decimals
  const number = parseFloat(value).toFixed(0);

  // Format with thousand separators
  return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function toDecimal(value) {
  return typeof value === 'number'
    ? new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value)
    : value;
}

export function swalError(message) {
  return Swal.fire({
    title: 'Error?',
    text: `${message}`,
    icon: 'warning',
    willOpen: () => {
      // Apply inline CSS to set z-index for SweetAlert modal
      const swalContainer = document.querySelector('.swal2-container');
      if (swalContainer) {
        swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
      }
    }
  });
}

export function swalSuccess(message) {
  return Swal.fire({
    title: 'Success Deleted',
    text: `${message}`,
    icon: 'success',
    willOpen: () => {
      // Apply inline CSS to set z-index for SweetAlert modal
      const swalContainer = document.querySelector('.swal2-container');
      if (swalContainer) {
        swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
      }
    }
  });
}

export function swalConfirm(message) {
  return Swal.fire({
    title: 'Are you sure?',
    text: `${message}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    willOpen: () => {
      // Apply inline CSS to set z-index for SweetAlert modal
      const swalContainer = document.querySelector('.swal2-container');
      if (swalContainer) {
        swalContainer.style.zIndex = '9999'; // Set a high z-index to make sure it's on top
      }
    }
  });
}
