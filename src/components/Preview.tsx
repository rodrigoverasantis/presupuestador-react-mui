import { useMemo } from "react";
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from "@react-pdf/renderer";
import type { ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero } from "../utils";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


export default function Preview(props: PreviewPropsInterface) {

  return (
    <>
      <Typography>{`Cliente: ${props.form.cliente}`}</Typography>
      <Typography>{`Empresa: ${props.form.empresa}`}</Typography>
      <Typography>{`RUT: ${props.form.rut}`}</Typography>
      <Typography>{`Dirección: ${props.form.direccion}`}</Typography>
      <Typography>{`Teléfono: ${props.form.telefono}`}</Typography>
      <Typography>{`Email: ${props.form.email}`}</Typography>
      <Typography>{`Ciudad: ${props.form.ciudad}`}</Typography>

      <TableComponent items={props.form.items} />
      {JSON.stringify(props.form)}
    </>
  );
}

const TableComponent = (props: { items: ItemInterface[] }) => (
  <TableContainer component={Paper} variant="outlined">
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell align="right">Cantidad</TableCell>
          <TableCell align="right">Precio</TableCell>
          <TableCell align="right">Subtotal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.items.map((item, index) => (
          <TableRow
            key={`item_${index}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">{item.price}</TableCell>
            <TableCell align="right">{FormatoDinero(item.quantity * item.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);