import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from "@react-pdf/renderer";
import type { FormInterface, ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero, MontoDescuento, MontoIva, MontoSubtotal } from "../utils";
import LoremIpsumLogo from "/logoipsum.png";

export default function PDF(props: PreviewPropsInterface) {

  return (
    <PDFViewer style={{ width: "100%", height: 900 }}>
      <Document key="pdf-document">
        <Page size="A4" style={ComponentStyles.document.body}>

          <View style={ComponentStyles.document.header}>
            <Image
              src={LoremIpsumLogo}
              style={ComponentStyles.document.header_logo}
            />

            <Text style={ComponentStyles.document.header_title}>
              Presupuestos Gratis Chile
            </Text>
          </View>

          {FormComponent(props.form)}

          {TableComponent(props.items, props.form.descuento, props.form.iva)}

          {DocFooter()}

          <Text style={ComponentStyles.document.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>
    </PDFViewer>
  );
}

/**
 * Subcomponente con los datos del formulario.
 * @param form Datos del formulario.
 * @returns Component.
 */
const FormComponent = (form: FormInterface) => (
  <View>
    <View style={ComponentStyles.form.row}>
      <View style={ComponentStyles.form.column}>
        <Text style={ComponentStyles.form.text_title}>
          Empresa {form.empresa.rut ? `[${form.empresa.rut}]` : ""}
        </Text>
        <Text style={ComponentStyles.form.text}>
          {form.empresa.nombre}
        </Text>
        <Text style={ComponentStyles.form.text}>
          Ubicación: {[form.empresa.ciudad, form.empresa.direccion].join(", ")}
        </Text>
        <Text style={ComponentStyles.form.text}>
          Correo: {form.empresa.email}
        </Text>
        <Text style={ComponentStyles.form.text}>
          Teléfono: {form.empresa.telefono}
        </Text>
      </View>

      <View style={ComponentStyles.form.column}>
        <Text style={ComponentStyles.form.text_title}>
          Cliente {form.cliente.rut ? `[${form.cliente.rut}]` : ""}
        </Text>
        <Text style={ComponentStyles.form.text}>
          {form.cliente.nombre}
        </Text>
        <Text style={ComponentStyles.form.text}>
          Ubicación: {[form.cliente.ciudad, form.cliente.direccion].join(", ")}
        </Text>
        <Text style={ComponentStyles.form.text}>
          Correo: {form.cliente.email}
        </Text>
        <Text style={ComponentStyles.form.text}>
          Teléfono: {form.cliente.telefono}
        </Text>
      </View>
    </View>

    <View style={ComponentStyles.form.column_right}>
      <Text style={ComponentStyles.form.text}>
        IVA: {form.iva}%
      </Text>
      <Text style={ComponentStyles.form.text}>
        Descuento: {form.descuento}%
      </Text>
      <Text style={ComponentStyles.form.text}>
        Moneda: {form.moneda?.label} {form.moneda?.value}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Fecha de emisión: {FormatoFecha(form.fechaEmision)}
      </Text>
      {form.fechaVencimiento && (
        <Text style={ComponentStyles.form.text}>
          Fecha de vencimiento: {FormatoFecha(form.fechaVencimiento)}
        </Text>
      )}
    </View>

    <Text style={ComponentStyles.form.text}>
      {`Descripción: ${form.descripcion}`}
    </Text>
  </View>
);

/**
 * Subcomponente con la tabla de elementos en el presupuesto.
 * @param items Colección de elementos.
 * @param descuento Porcentaje de descuento.
 * @param iva Porcentaje de impuesto al valor agregado.
 * @returns Componente.
 */
const TableComponent = (items: ItemInterface[], descuento: number, iva: number) => (
  <View style={{ marginTop: 20 }}>
    {/* TABLE HEADER */}
    <View style={ComponentStyles.table.header_row}>
      <Text style={[ComponentStyles.table.header_text, ComponentStyles.table.header_name]}>
        Nombre
      </Text>
      <Text style={[ComponentStyles.table.header_text, ComponentStyles.table.header_quantity]}>
        Cant.
      </Text>
      <Text style={[ComponentStyles.table.header_text, ComponentStyles.table.header_price]}>
        Precio
      </Text>
      <Text style={[ComponentStyles.table.header_text, ComponentStyles.table.header_amount]}>
        Monto
      </Text>
    </View>

    {/* TABLE BODY */}
    <View>
      {/* SI NO HAY ELEMENTO */}
      {items.length === 0 && (
        <View style={ComponentStyles.table.body_row}>
          <Text style={ComponentStyles.table.body_row_empty}>
            Sin elementos
          </Text>
        </View>
      )}

      {/* COLECCIÓN DE ELEMENTOS */}
      {items.map((item, index) => (
        <View style={ComponentStyles.table.body_row} key={`elemento_${index}`}>
          <Text style={[ComponentStyles.table.body_text, ComponentStyles.table.body_name]}>
            {item.name}
          </Text>
          <Text style={[ComponentStyles.table.body_text, ComponentStyles.table.body_quantity]}>
            {item.quantity}
          </Text>
          <Text style={[ComponentStyles.table.body_text, ComponentStyles.table.body_price]}>
            {FormatoDinero(item.price)}
          </Text>
          <Text style={[ComponentStyles.table.body_text, ComponentStyles.table.body_amount]}>
            {FormatoDinero(item.price * item.quantity)}
          </Text>
        </View>
      ))}
    </View>

    {/* TABLE FOOTER */}
    <View>
      <View style={ComponentStyles.table.footer_row}>
        <Text style={ComponentStyles.table.footer_text}>
          {descuento > 0 ? `Subtotal con ${descuento}% de descuento` : "Subtotal"}
        </Text>
        <Text style={ComponentStyles.table.footer_value}>
          {descuento > 0 ? FormatoDinero(MontoDescuento(items, descuento)) : FormatoDinero(MontoSubtotal(items))}
        </Text>
      </View>
      <View style={ComponentStyles.table.footer_row}>
        <Text style={ComponentStyles.table.footer_text}>
          IVA {iva}%
        </Text>
        <Text style={ComponentStyles.table.footer_value}>
          {FormatoDinero(MontoIva(items, descuento, iva))}
        </Text>
      </View>
      <View style={ComponentStyles.table.footer_row}>
        <Text style={ComponentStyles.table.footer_text}>
          Total
        </Text>
        <Text style={ComponentStyles.table.footer_value}>
          {FormatoDinero(MontoDescuento(items, descuento) + MontoIva(items, descuento, iva))}
        </Text>
      </View>
    </View>
  </View>
);

/**
 * Subcomponente con el footer del documento.
 * @returns Componente.
 */
const DocFooter = () => (
  <View style={ComponentStyles.document.footer}>
    <Text style={ComponentStyles.document.footer_title}>
      Observación
    </Text>
    <Text style={ComponentStyles.document.footer_text}>
      Se debe pagar el 50% de forma adelantada. El 50% restante se deberá pagar a los 30 días.
    </Text>
  </View>
);

const MAIN_COLOR = "#1CACFF";
const TABLE_BORDER_COLOR = "#2DABFF";
const TABLE_TEXT_SIZE = 12;

const ComponentStyles = {
  document: StyleSheet.create({
    body: {
      height: "100%",
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 40,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    header_title: {
      fontSize: 22,
      textAlign: "right",
      color: MAIN_COLOR,
    },
    header_logo: {
      width: 100,
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    footer: {
      position: "absolute",
      bottom: 80,
      left: 40,
      right: 40,
    },
    footer_title: {
      fontSize: 12,
      fontWeight: 1500,
      lineHeight: 1.5,
      color: MAIN_COLOR,
      borderBottomColor: MAIN_COLOR,
      borderBottomWidth: 1,
    },
    footer_text: {
      fontSize: 12,
      lineHeight: 1.5,
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  }),
  form: StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    column: {
      width: "48%",
    },
    column_right: {
      textAlign: "right",
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
    },
    text_title: {
      fontSize: 12,
      fontWeight: 1500,
      lineHeight: 1.5,
      color: MAIN_COLOR,
      borderBottomColor: MAIN_COLOR,
      borderBottomWidth: 1,
    },
  }),
  table: StyleSheet.create({
    header_row: {
      flexDirection: "row",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    header_text: {
      color: MAIN_COLOR,
      fontSize: TABLE_TEXT_SIZE,
      fontWeight: 1500,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    header_name: {
      width: "55%",
      textAlign: "left",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    header_quantity: {
      width: "10%",
      textAlign: "right",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingRight: 8,
    },
    header_price: {
      width: "15%",
      textAlign: "right",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingRight: 8,
    },
    header_amount: {
      width: "20%",
      textAlign: "right",
      paddingRight: 8,
    },
    body_row: {
      flexDirection: "row",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    body_row_empty: {
      width: "100%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "center",
      paddingLeft: 8,
    },
    body_text: {
      fontSize: TABLE_TEXT_SIZE,
    },
    body_name: {
      width: "55%",
      textAlign: "left",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    body_quantity: {
      width: "10%",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    body_price: {
      width: "15%",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    body_amount: {
      width: "20%",
      textAlign: "right",
      paddingRight: 8,
    },
    footer_row: {
      flexDirection: "row",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    footer_text: {
      width: "80%",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    footer_value: {
      width: "20%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "right",
      paddingRight: 8,
    },
  }),
}