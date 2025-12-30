import dayjs from "dayjs";
import type { ItemInterface, MonedaInterface } from "./interfaces";

/**
 * Método encargado de calcular el subtotal de los elementos.
 * @param items Colección de elementos.
 * @returns Subtotal de los elementos.
 */
export const MontoSubtotal = (items: ItemInterface[]) => {
  const montos = items.map(i => (i.quantity * i.price) || 0);
  const subtotal = montos.reduce((prev, curr) => prev + curr, 0);
  return subtotal;
}

/**
 * Método encargado de calcular el subtotal con porcentaje de decuento aplicado.
 * @param items Colección de los elementos.
 * @param porcentaje Porcentaje de decuento.
 * @returns Subtotal con porcentaje de decuento aplicado.
 */
export const MontoDescuento = (items: ItemInterface[], porcentaje: number) => {
  const subtotal = MontoSubtotal(items);
  const descuento = subtotal * (1 - porcentaje / 100);
  return descuento;
}

/**
 * Método encargado de calcular el monto que corresponde al porcentaje de IVA.
 * @param items Colección de elementos.
 * @param porcentajeDescuento Porcentantaje de decuento.
 * @param porcentajeIva Porcentaje de impuesto al valor agregado.
 * @returns Monto correspondiente al IVA.
 */
export const MontoIva = (items: ItemInterface[], porcentajeDescuento: number, porcentajeIva: number) => {
  const subtotal = MontoDescuento(items, porcentajeDescuento);
  const iva = subtotal * porcentajeIva / 100;
  return iva;
}

/**
 * Método encargado de formatear a formato de dinero.
 * @param valor Cantidad a formatear.
 * @param divisa Tipo de divisa.
 * @returns Cantidad formateada como dinero.
 */
export const FormatoDinero = (valor: number, divisa: string = "CLP") => {
  const formatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: divisa,
    minimumFractionDigits: divisa === "CLP" ? 0 : 2,
  });
  return formatter.format(valor);
}

/**
 * Método encargado de formatear una fecha.
 * @param fecha Fecha a formatear.
 * @returns Fecha formateada a DD/MM/YYYY.
 */
export const FormatoFecha = (fecha: dayjs.Dayjs | null | undefined) => {
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