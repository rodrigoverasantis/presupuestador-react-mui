export interface Form {
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
  fechaVencimiento: Date;
  descripcion: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  link: string;
}

export interface ItemsProps {
  items: Array<Item>;
  handleAgregar: () => void;
  handleEliminar: (itemIndex: number) => void;
  handleEditar: (itemIndex: number, editedItem: Item) => void;
}