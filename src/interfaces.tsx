import type dayjs from "dayjs";

export interface FormInterface {
  empresa: EmpresaInterface;
  cliente: ClienteInterface;
  iva: number;
  moneda: MonedaInterface | null;
  descuento: number;
  fechaEmision: dayjs.Dayjs;
  fechaVencimiento?: dayjs.Dayjs;
  descripcion: string;
}

export interface EmpresaInterface {
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
  ciudad: string;
  direccion: string;
}

export interface ClienteInterface {
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
  ciudad: string;
  direccion: string;
}

export interface ItemInterface {
  name: string;
  quantity: number;
  price: number;
  link: string;
}

export interface MonedaInterface {
  label: string;
  value: string;
}

export interface FormPropsInterface {
  form: FormInterface;
  handleEditarEmpresa: (newData: object) => void,
  handleEditarCliente: (newData: object) => void,
  handleEditarFormulario: (newData: object) => void,
}

export interface ItemsPropsInterface {
  items: Array<ItemInterface>;
  handleAgregar: () => void;
  handleEliminar: (itemIndex: number) => void;
  handleEditarElementos: (itemIndex: number, editedItem: ItemInterface) => void;
}

export interface PreviewPropsInterface {
  form: FormInterface;
  items: ItemInterface[];
}