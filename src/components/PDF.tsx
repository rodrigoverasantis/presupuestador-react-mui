import { useMemo } from "react";
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from "@react-pdf/renderer";
import type { ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero } from "../utils";

const borderColor = "#90e5fc";

export default function PDF(props: PreviewPropsInterface) {

  return (
    <PDFViewer style={{ width: 600, height: 900 }}>
      <Document key="pdf-document">
        <Page size="A4" style={styles.body}>
          <Text style={styles.header}>
            ~ Created with react-pdf ~
          </Text>
          <Text style={styles.title}>Don Quijote de la Mancha</Text>
          <Text style={styles.author}>Miguel de Cervantes aa</Text>

          <Text style={styles.text}>
            {`Cliente: ${props.form.cliente}`}
          </Text>
          <Text style={styles.text}>
            {`Empresa: ${props.form.empresa}`}
          </Text>
          <Text style={styles.text}>
            {`RUT: ${props.form.rut}`}
          </Text>
          <Text style={styles.text}>
            {`Dirección: ${props.form.direccion}`}
          </Text>
          <Text style={styles.text}>
            {`Teléfono: ${props.form.telefono}`}
          </Text>
          <Text style={styles.text}>
            {`Email: ${props.form.email}`}
          </Text>
          <Text style={styles.text}>
            {`Ciudad: ${props.form.ciudad}`}
          </Text>
          <Text style={styles.text}>
            {`IVA: ${props.form.iva}%`}
          </Text>
          <Text style={styles.text}>
            {`Moneda: ${props.form.moneda ? `${props.form.moneda.label} ${props.form.moneda.value}` : ""}`}
          </Text>
          <Text style={styles.text}>
            {`Descuento: ${props.form.descuento}%`}
          </Text>
          <Text style={styles.text}>
            {`Fecha de emisión: ${FormatoFecha(props.form.fechaEmision)}`}
          </Text>
          <Text style={styles.text}>
            {`Fecha de vencimiento: ${FormatoFecha(props.form.fechaVencimiento)}`}
          </Text>
          <Text style={styles.text}>
            {`Descripción: ${props.form.descripcion}`}
          </Text>
          {props.form.items.map((item, index) => (
            <TableRowComponent
              item={item}
              key={`item_${index}`}
            />
          ))}

          <Text style={styles.text}>
            Con estas y semejantes razones perdía el pobre caballero el juicio, y
            desvelábase por entenderlas, y desentrañarles el sentido, que no se lo
            sacara, ni las entendiera el mismo Aristóteles, si resucitara para sólo
            ello. No estaba muy bien con las heridas que don Belianis daba y
            recibía, porque se imaginaba que por grandes maestros que le hubiesen
            curado, no dejaría de tener el rostro y todo el cuerpo lleno de
            cicatrices y señales; pero con todo alababa en su autor aquel acabar su
            libro con la promesa de aquella inacabable aventura, y muchas veces le
            vino deseo de tomar la pluma, y darle fin al pie de la letra como allí
            se promete; y sin duda alguna lo hiciera, y aun saliera con ello, si
            otros mayores y continuos pensamientos no se lo estorbaran. Tuvo muchas
            veces competencia con el cura de su lugar (que era hombre docto graduado
            en Sigüenza), sobre cuál había sido mejor caballero, Palmerín de
            Inglaterra o Amadís de Gaula; mas maese Nicolás, barbero del mismo
            pueblo, decía que ninguno llegaba al caballero del Febo, y que si alguno
            se le podía comparar, era don Galaor, hermano de Amadís de Gaula, porque
            tenía muy acomodada condición para todo; que no era caballero
            melindroso, ni tan llorón como su hermano, y que en lo de la valentía no
            le iba en zaga.
          </Text>
          <Text style={styles.text}>
            En resolución, él se enfrascó tanto en su lectura, que se le pasaban las
            noches leyendo de claro en claro, y los días de turbio en turbio, y así,
            del poco dormir y del mucho leer, se le secó el cerebro, de manera que
            vino a perder el juicio. Llenósele la fantasía de todo aquello que leía
            en los libros, así de encantamientos, como de pendencias, batallas,
            desafíos, heridas, requiebros, amores, tormentas y disparates
            imposibles, y asentósele de tal modo en la imaginación que era verdad
            toda aquella máquina de aquellas soñadas invenciones que leía, que para
            él no había otra historia más cierta en el mundo.
          </Text>
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

const TableRowComponent = (props: { item: ItemInterface }) => {
  console.log(props.item);
  const valor = useMemo(() => {
    if (isNaN(props.item.price) || isNaN(props.item.quantity)) {
      return 0;
    }
    return props.item.price * props.item.quantity;
  }, [props.item]);
  const TableRowStyle = StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
    },
    description: {
      width: "60%",
      textAlign: "left",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    qty: {
      width: "10%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    rate: {
      width: "15%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    amount: {
      width: "15%",
      textAlign: "right",
      paddingRight: 8,
    },
  });
  // if (!props.item.name || !props.item.price || !props.item.quantity || !props.item.link) {
  //   return null;
  // }

  return (
    <View style={TableRowStyle.row}>
      <Text style={TableRowStyle.description}>{props.item.name || ""}</Text>
      <Text style={TableRowStyle.qty}>{props.item.quantity || 0}</Text>
      <Text style={TableRowStyle.rate}>{props.item.price || 0}</Text>
      <Text style={TableRowStyle.amount}>{FormatoDinero(valor)}</Text>
    </View>
  );
}