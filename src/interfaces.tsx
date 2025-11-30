export interface ItemsProps {
  items: Array<Item>;
  handleAgregar: () => void;
  handleEliminar: (itemIndex: number) => void;
  handleEditar: (itemIndex: number, editedItem: Item) => void;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  link: string;
}