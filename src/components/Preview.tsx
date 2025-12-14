import type { ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero } from "../utils";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


export default function Preview(props: PreviewPropsInterface) {

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography>{`Cliente: ${props.form.cliente}`}</Typography>
        <Typography>{`Empresa: ${props.form.empresa}`}</Typography>
        <Typography>{`RUT: ${props.form.rut}`}</Typography>
        <Typography>{`Dirección: ${props.form.direccion}`}</Typography>
        <Typography>{`Teléfono: ${props.form.telefono}`}</Typography>
        <Typography>{`Email: ${props.form.email}`}</Typography>
        <Typography>{`Ciudad: ${props.form.ciudad}`}</Typography>
        <Typography>{`IVA: ${props.form.iva}%`}</Typography>
        <Typography>{`Moneda: ${props.form.moneda?.label} ${props.form.moneda?.value}`}</Typography>
        <Typography>{`Descuento: ${props.form.descuento}%`}</Typography>
        <Typography>{`Fecha emisión: ${FormatoFecha(props.form.fechaEmision)}`}</Typography>
        <Typography>{`Fecha vencimiento: ${FormatoFecha(props.form.fechaVencimiento)}`}</Typography>
      </Paper>

      <TableComponent items={props.form.items} />
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