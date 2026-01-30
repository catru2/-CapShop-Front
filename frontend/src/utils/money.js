export function formatMXN(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "$0.00";

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
