export interface FormInterface {
  cliente: string;
  empresa: string;
  rut: string;
  direccion: string;
  telefono: string;
  email: string;
  ciudad: string;
  iva: number;
  moneda: MonedaInterface | null;
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

export interface MonedaInterface {
  label: string;
  value: string;
}

export interface FormPropsInterface {
  form: FormInterface;
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
  // subtotal: number;
  // iva: number;
  // descuento: number;
  // total: number;
}