import { useMemo } from "react";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";
import type { PreviewPropsInterface, PreviewTablePropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero, FormatoMoneda } from "../utils";


export default function Preview(props: PreviewPropsInterface) {

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {/* Columna izquierda */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Cliente: {props.form.cliente}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Empresa: {props.form.empresa}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              RUT: {props.form.rut}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Dirección: {props.form.direccion}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Teléfono: {props.form.telefono}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Email: {props.form.email}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Ciudad: {props.form.ciudad}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              IVA: {props.form.iva}%
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Moneda: {FormatoMoneda(props.form.moneda)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Descuento: {props.form.descuento}%
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Fecha emisión: {FormatoFecha(props.form.fechaEmision)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              Fecha vencimiento: {FormatoFecha(props.form.fechaVencimiento)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography>
              Descripción: {props.form.descripcion}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <TableComponent
        iva={props.form.iva}
        descuento={props.form.descuento}
        items={props.form.items}
      />
    </>
  );
}

/**
 * Subcomponente tabla con los elementos agregados al presupusto.
 * @param props 
 * @returns Component.
 */
const TableComponent = (props: PreviewTablePropsInterface) => {
  const montos = useMemo(() => props.items.map(i => (i.quantity * i.price) || 0), [props.items]);
  const subtotal = useMemo(() => montos.reduce((prev, curr) => prev + curr, 0), [montos]);
  const iva = useMemo(() => subtotal * (props.iva / 100), [subtotal, props.iva]);
  const descuento = useMemo(() => subtotal * (props.descuento / 100), [subtotal, props.descuento]);
  const total = useMemo(() => subtotal + iva - descuento, [subtotal, iva, descuento]);

  return (
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
            <TableRow key={`item_${index}`}>
              <TableCell component="th" scope="row">
                {item.name}
                {item.link && (
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <Link />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{FormatoDinero(item.price)}</TableCell>
              <TableCell align="right">{FormatoDinero(item.quantity * item.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} align="right">
              Subtotal
            </TableCell>
            <TableCell align="right">
              {FormatoDinero(subtotal)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={3} align="right">
              IVA {props.iva || 0}%
            </TableCell>
            <TableCell align="right">
              {FormatoDinero(iva)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={3} align="right">
              Descuento {props.descuento || 0}%
            </TableCell>
            <TableCell align="right">
              {FormatoDinero(descuento)}
            </TableCell> {/* o el valor real */}
          </TableRow>

          <TableRow>
            <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>
              Total
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              {FormatoDinero(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}