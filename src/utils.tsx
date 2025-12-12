import dayjs from "dayjs";

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
  return `$${formatter.format(valor)}`;
}

/**
 * Método encargado de formatear una fecha.
 * @param fecha Fecha a formatear.
 * @returns Fecha formateada a DD/MM/YYYY.
 */
export const FormatoFecha = (fecha: Date | null) => {
  if (!dayjs.isDayjs(fecha)) {
    return "";
  }
  return dayjs(fecha).format("DD/MM/YYYY");
} 

/**
 * Colección de tipos de monedas.
 */
export const TIPOS_MONEDA = [
  { label: "Dólar", value: "USD" },
  { label: "Peso chileno", value: "CLP" },
  { label: "Unidad de fomento", value: "UF" },
];