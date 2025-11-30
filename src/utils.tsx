/**
 * Método encargado de formatear a formato de dinero.
 * @param valor Cantidad a formatear.
 * @param divisa Tipo de divisa.
 * @returns Cantidad formateada como dinero.
 */
export const FormatoDinero = (valor: number, divisa: string = "CLP") => {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: divisa,
    minimumFractionDigits: divisa === "CLP" ? 0 : 2,
  });
  return formatter.format(valor);
}