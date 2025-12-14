import dayjs from "dayjs";
import type { MonedaInterface } from "./interfaces";

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
 * Método encargado de formatear una moneda.
 * @param moneda Moneda a formatear.
 * @returns Moneda formateada.
 */
export const FormatoMoneda = (moneda: MonedaInterface | null) => {
  if (!moneda) {
    return "";
  }
  return `${moneda.label} ${moneda.value}`;
}
/**
 * Colección de tipos de monedas.
 */
export const TIPOS_MONEDA: MonedaInterface[] = [
  { label: "Dólar", value: "USD" },
  { label: "Peso chileno", value: "CLP" },
  { label: "Unidad de fomento", value: "UF" },
];