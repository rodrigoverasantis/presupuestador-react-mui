import type { FormInterface } from "./interfaces";

export class Form implements FormInterface {
  cliente: string;
  empresa: string;
  rut: string;
  direccion: string;
  telefono: string;
  email: string;
  ciudad: string;
  iva: number;
  moneda: null;
  descuento: number;
  fechaEmision: Date;
  fechaVencimiento: Date | null;
  descripcion: string;

  constructor() {
    this.cliente = "";
    this.empresa = "";
    this.rut = "";
    this.direccion = "";
    this.telefono = "";
    this.email = "";
    this.ciudad = "";
    this.iva = 0;
    this.moneda = null;
    this.descuento = 0;
    this.fechaEmision = new Date();
    this.fechaVencimiento = null;
    this.descripcion = "";
  }
}