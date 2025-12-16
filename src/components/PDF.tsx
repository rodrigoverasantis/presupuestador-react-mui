import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from "@react-pdf/renderer";
import type { ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero } from "../utils";

export default function PDF(props: PreviewPropsInterface) {

  return (
    <PDFViewer style={{ width: "100%", height: 900 }}>
      <Document key="pdf-document">
        <Page size="A4" style={styles.body}>
          <Text style={styles.header}>
            ~ Created with react-pdf ~
          </Text>
          <Text style={styles.title}>Don Quijote de la Mancha</Text>
          <Text style={styles.author}>Miguel de Cervantes aa</Text>

          <View style={ComponentStyles.form.row}>
            <View style={ComponentStyles.form.column}>
              <Text style={ComponentStyles.form.text}>
                Cliente: {props.form.cliente}
              </Text>
              <Text style={ComponentStyles.form.text}>
                Empresa: {props.form.empresa}
              </Text>
              <Text style={ComponentStyles.form.text}>
                RUT: {props.form.rut}
              </Text>
              <Text style={ComponentStyles.form.text}>
                Ciudad: {props.form.ciudad}
              </Text>
              <Text style={ComponentStyles.form.text}>
                IVA: {props.form.iva}%
              </Text>
              <Text style={ComponentStyles.form.text}>
                Moneda: {props.form.moneda?.label} {props.form.moneda?.value}
              </Text>
            </View>

            <View style={ComponentStyles.form.column}>
              <Text style={ComponentStyles.form.text}>
                Dirección: {props.form.direccion}
              </Text>
              <Text style={ComponentStyles.form.text}>
                Teléfono: {props.form.telefono}
              </Text>
              <Text style={ComponentStyles.form.text}>
                Email: {props.form.email}
              </Text>
              <Text style={ComponentStyles.form.text}>
                Descuento: {props.form.descuento}%
              </Text>
              <Text style={ComponentStyles.form.text}>
                Fecha de emisión: {FormatoFecha(props.form.fechaEmision)}
              </Text>
              <Text style={ComponentStyles.form.text}>
                Fecha de vencimiento: {FormatoFecha(props.form.fechaVencimiento)}
              </Text>
            </View>
          </View>
          <Text style={ComponentStyles.form.text}>
            {`Descripción: ${props.form.descripcion}`}
          </Text>

          {TableHeadersComponent()}

          {TableRowsComponent(props.items)}

          {TableFooterComponent()}

          <Text style={styles.subtitle} break>
            Capítulo II: Que trata de la primera salida que de su tierra hizo el
            ingenioso Don Quijote
          </Text>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Don_Quijote_and_Sancho_Panza.jpg"
            style={styles.image}
          />
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Times-Roman"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Times-Roman"
  },
  text: {
    margin: 2,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
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
});

/**
 * Subcomponente con los headers de la tabla de elementos.
 * @returns Component.
 */
const TableHeadersComponent = () => (
  <View style={ComponentStyles.tableHeader.row}>
    <Text style={ComponentStyles.tableHeader.name}>
      Nombre
    </Text>
    <Text style={ComponentStyles.tableHeader.quantity}>
      Cant.
    </Text>
    <Text style={ComponentStyles.tableHeader.price}>
      Precio
    </Text>
    <Text style={ComponentStyles.tableHeader.total}>
      Monto
    </Text>
  </View>
);

/**
 * Subcomponente con el listado de elementos en la tabla.
 * @param items Colección de elementos.
 * @returns Componente.
 */
const TableRowsComponent = (items: ItemInterface[]) => (
  <View>
    {items.length === 0 && (
      <View style={ComponentStyles.tableRow.row}>
        <Text style={ComponentStyles.tableRow.row_empty}>
          Sin elementos
        </Text>
      </View>
    )}
    {items.map((item, index) => (
      <View style={ComponentStyles.tableRow.row} key={`elemento_${index}`}>
        <Text style={ComponentStyles.tableRow.name}>
          {item.name || ""}
        </Text>
        <Text style={ComponentStyles.tableRow.quantity}>
          {item.quantity}
        </Text>
        <Text style={ComponentStyles.tableRow.price}>
          {FormatoDinero(item.price)}
        </Text>
        <Text style={ComponentStyles.tableRow.total}>
          {FormatoDinero(item.price * item.quantity)}
        </Text>
      </View>
    ))}
  </View>
)

/**
 * Subcomponente encargado de mostrar el subtotal, porcentaje de IVA y total.
 * @returns Component.
 */
const TableFooterComponent = () => (
  <View>
    <View style={ComponentStyles.tableFooter.row}>
      <Text style={ComponentStyles.tableFooter.text}>
        Subtotal
      </Text>
      <Text style={ComponentStyles.tableFooter.value}>
        $123.456
      </Text>
    </View>
    <View style={ComponentStyles.tableFooter.row}>
      <Text style={ComponentStyles.tableFooter.text}>
        IVA 10%
      </Text>
      <Text style={ComponentStyles.tableFooter.value}>
        $12.345
      </Text>
    </View>
    <View style={ComponentStyles.tableFooter.row}>
      <Text style={ComponentStyles.tableFooter.text}>
        Total
      </Text>
      <Text style={ComponentStyles.tableFooter.value}>
        $135.680
      </Text>
    </View>
  </View>
);

const TABLE_BORDER_COLOR = "#000000";
const TABLE_TEXT_SIZE = 12;

const ComponentStyles = {
  form: StyleSheet.create({
    row: {
      flexDirection: "row",        // <‑‑ columnas en fila
      justifyContent: "space-between",
      marginBottom: 10,
    },
    column: {
      width: "48%",                // 48% + 4% de margen = 100%
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
    },
  }),
  tableHeader: StyleSheet.create({
    row: {
      flexDirection: "row",
      backgroundColor: "gray",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    row_empty: {
      width: "100%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "center",
      paddingLeft: 8,
    },
    name: {
      width: "55%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "left",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    quantity: {
      width: "10%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    price: {
      width: "15%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    total: {
      width: "20%",
      color: "white",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "right",
      paddingRight: 8,
    },
  }),
  tableRow: StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    row_empty: {
      width: "100%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "center",
      paddingLeft: 8,
    },
    name: {
      width: "55%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "left",
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    quantity: {
      width: "10%",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    price: {
      width: "15%",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    total: {
      width: "20%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "right",
      paddingRight: 8,
    },
  }),
  tableFooter: StyleSheet.create({
    row: {
      flexDirection: "row",
      backgroundColor: "lightgray",
      borderBottomColor: TABLE_BORDER_COLOR,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    text: {
      width: "80%",
      fontSize: TABLE_TEXT_SIZE,
      borderRightColor: TABLE_BORDER_COLOR,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    value: {
      width: "20%",
      fontSize: TABLE_TEXT_SIZE,
      textAlign: "right",
      paddingRight: 8,
    },
  }),
}