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
