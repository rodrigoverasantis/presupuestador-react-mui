import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from "@react-pdf/renderer";
import type { ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero, MontoDescuento, MontoIva, MontoSubtotal } from "../utils";

export default function PDF(props: PreviewPropsInterface) {

  return (
    <PDFViewer style={{ width: "100%", height: 900 }}>
      <Document key="pdf-document">
        <Page size="A4" style={ComponentStyles.document.body}>
          <Text style={ComponentStyles.document.header}>
            Presupuestos Gratis Chile
          </Text>


          <Text style={ComponentStyles.form.text}>
            {`Descripción: ${props.form.descripcion}`}
          </Text>

          {TableComponent(props.items, props.form.descuento, props.form.iva)}

          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Don_Quijote_and_Sancho_Panza.jpg"
            style={ComponentStyles.document.image}
          />

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
  <View style={ComponentStyles.form.row}>
    <View style={ComponentStyles.form.column}>
      <Text style={ComponentStyles.form.text}>
        Cliente: {form.cliente}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Empresa: {form.empresa}
      </Text>
      <Text style={ComponentStyles.form.text}>
        RUT: {form.rut}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Ciudad: {form.ciudad}
      </Text>
      <Text style={ComponentStyles.form.text}>
        IVA: {form.iva}%
      </Text>
      <Text style={ComponentStyles.form.text}>
        Moneda: {form.moneda?.label} {form.moneda?.value}
      </Text>
    </View>

    <View style={ComponentStyles.form.column}>
      <Text style={ComponentStyles.form.text}>
        Dirección: {form.direccion}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Teléfono: {form.telefono}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Email: {form.email}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Descuento: {form.descuento}%
      </Text>
      <Text style={ComponentStyles.form.text}>
        Fecha de emisión: {FormatoFecha(form.fechaEmision)}
      </Text>
      <Text style={ComponentStyles.form.text}>
        Fecha de vencimiento: {FormatoFecha(form.fechaVencimiento)}
      </Text>
    </View>
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
  <View>
    {/* TABLE HEADER */}
    <View style={ComponentStyles.table.header_row}>
      <Text style={ComponentStyles.table.header_name}>
        Nombre
      </Text>
      <Text style={ComponentStyles.table.header_quantity}>
        Cant.
      </Text>
      <Text style={ComponentStyles.table.header_price}>
        Precio
      </Text>
      <Text style={ComponentStyles.table.header_total}>
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
          <Text style={ComponentStyles.table.body_name}>
            {item.name}
          </Text>
          <Text style={ComponentStyles.table.body_quantity}>
            {item.quantity}
          </Text>
          <Text style={ComponentStyles.table.body_price}>
            {FormatoDinero(item.price)}
          </Text>
          <Text style={ComponentStyles.table.body_total}>
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

const TABLE_BORDER_COLOR = "#000000";
const TABLE_TEXT_SIZE = 12;

const ComponentStyles = {
  document: StyleSheet.create({
    body: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 40,
    },
    header: {
      fontSize: 24,
      textAlign: "right",
      marginBottom: 20,
      color: "slategray",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
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
    text: {
      fontSize: 12,
      lineHeight: 1.5,
    },
  }),
  table: StyleSheet.create({
    header_row: {
      flexDirection: "row",
      backgroundColor: "gray",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    header_name: {
      width: "55%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "left",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    header_quantity: {
      width: "10%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    header_price: {
      width: "15%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    header_total: {
      width: "20%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
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
    body_name: {
      width: "55%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "left",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    body_quantity: {
      width: "10%",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    body_price: {
      width: "15%",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    body_total: {
      width: "20%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "right",
      paddingRight: 8,
    },
    footer_row: {
      flexDirection: "row",
      backgroundColor: "lightgray",
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