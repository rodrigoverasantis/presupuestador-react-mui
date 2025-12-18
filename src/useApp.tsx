import { useState } from "react";
import { type FormInterface, type ItemInterface } from "./interfaces";
import dayjs from "dayjs";

export default function UseApp() {
  const [tabIndex, setTabIndex] = useState(0);
  const [form, setForm] = useState<FormInterface>(FORM_INITIAL_VALUES);
  const [items, setItems] = useState<ItemInterface[]>([]);

  /**
   * Método encargado de combinar los datos del formulario con los nuevos datos.
   * @param newData Datos actualizados del formulario.
   */
  const handleEditarFormulario = (newData: object) => {
    setForm({ ...form, ...newData })
  }

  /**
   * Método encargado de agregar nuevos elementos.
   */
  const handleAgregar = () => {
    const newItem: ItemInterface = {
      name: "",
      quantity: 1,
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
  const handleEditarElementos = (itemIndex: number, editedItem: ItemInterface) => {
    const editedItems = items.map((item, index) => index === itemIndex ? editedItem : item);
    setItems(editedItems);
  }

  return {
    tabIndex,
    setTabIndex,

    form,
    handleEditarFormulario,

    items: items,
    handleAgregar,
    handleEliminar,
    handleEditarElementos,
  }
}

const FORM_INITIAL_VALUES: FormInterface = {
  cliente: "",
  empresa: "",
  rut: "",
  direccion: "",
  telefono: "",
  email: "",
  ciudad: "",
  iva: 0,
  moneda: null,
  descuento: 0,
  fechaEmision: dayjs(),
  fechaVencimiento: null,
  descripcion: "",
}