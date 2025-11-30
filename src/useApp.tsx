import { useState } from "react";
import { type FormInterface, type ItemInterface } from "./interfaces";
import { Form } from "./classes";

export default function UseApp() {
  const [form, setForm] = useState<FormInterface>(new Form());
  const [items, setItems] = useState<ItemInterface[]>([]);

  /**
   * Método encargado de agregar nuevos elementos.
   */
  const handleAgregar = () => {
    let newItem: ItemInterface = {
      name: "",
      quantity: 0,
      price: 0,
      link: "",
    }
    setItems([...items, newItem]);
  }

  /**
   * Método encargado de eliminar un elemento.
   * @param itemIndex Índice del elemento.
   */
  const handleEliminar = (itemIndex: number) => {
    const filteredItems = items.filter((_, index) => index !== itemIndex);
    setItems(filteredItems);
  }

  /**
   * Método encargado de actualizar los datos de un elemento.
   * @param itemIndex Índice del elemento.
   * @param editedItem Elemento con los datos actualizados.
   */
  const handleEditar = (itemIndex: number, editedItem: ItemInterface) => {
    const editedItems = items.map((item, index) => index === itemIndex ? editedItem : item);
    setItems(editedItems);
  }

  return {
    form,
    setForm,
    items,
    handleAgregar,
    handleEliminar,
    handleEditar,
  }
}