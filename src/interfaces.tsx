export interface FormInterface {
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
}

export interface ItemInterface {
  name: string;
  quantity: number;
  price: number;
  link: string;
}

export interface FormPropsInterface {
  form: FormInterface;
  setForm: (form: FormInterface) => void;
}

export interface ItemsPropsInterface {
  items: Array<ItemInterface>;
  handleAgregar: () => void;
  handleEliminar: (itemIndex: number) => void;
  handleEditar: (itemIndex: number, editedItem: ItemInterface) => void;
}

export interface PreviewPropsInterface {
  form: FormInterface;
}