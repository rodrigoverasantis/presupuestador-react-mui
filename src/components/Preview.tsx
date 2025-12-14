import { Box, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";
import type { FormInterface, ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero, FormatoMoneda } from "../utils";

export default function Preview(props: PreviewPropsInterface) {

  return (
    <Stack direction={"column"} spacing={2}>
      {FormComponent(props.form)}

      {TableComponent(props.items, props.form.descuento, props.form.iva)}
    </Stack>
  );
}

/**
 * Subcomponente con los datos del formulario.
 * @param form Datos del formulario.
 * @returns Component.
 */
const FormComponent = (form: FormInterface) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Cliente: {form.cliente}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Empresa: {form.empresa}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          RUT: {form.rut}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Dirección: {form.direccion}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Teléfono: {form.telefono}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Email: {form.email}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Ciudad: {form.ciudad}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          IVA: {form.iva}%
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Moneda: {FormatoMoneda(form.moneda)}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Descuento: {form.descuento}%
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Fecha emisión: {FormatoFecha(form.fechaEmision)}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography>
          Fecha vencimiento: {FormatoFecha(form.fechaVencimiento)}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography>
          Descripción: {form.descripcion}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

/**
 * Subcomponente tabla con los elementos agregados al presupusto.
 * @param items Colección de elementos.
 * @param descuento Porcentaje de descuento.
 * @param iva Porcentaje de impuesto al valor agregado.
 * @returns Component.
 */
const TableComponent = (items: ItemInterface[], descuento: number, iva: number) => (
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
        {items.map((item, index) => (
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
            {descuento > 0 ? `Subtotal con ${descuento}% de descuento` : "Subtotal"}
          </TableCell>
          <TableCell align="right">
            {SubtotalComponent(items, descuento)}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={3} align="right">
            IVA {iva || 0}%
          </TableCell>
          <TableCell align="right">
            {FormatoDinero(MontoIva(items, descuento, iva))}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>
            Total
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: "bold" }}>
            {FormatoDinero(MontoDescuento(items, descuento) + MontoIva(items, descuento, iva))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
);

/**
 * Subcomponente con los totales para la tabla.
 * @param items Colección de elementos.
 * @param porcentaje Porcentaje de descuento.
 * @returns 
 */
const SubtotalComponent = (items: ItemInterface[], porcentaje: number) => (
  <Box display={"flex"} justifyContent={"flex-end"}>
    <Typography
      fontSize={14}
      sx={{
        textDecoration: porcentaje > 0 ? "line-through" : "inhertit",
      }}
    >
      {FormatoDinero(MontoSubtotal(items))}
    </Typography>

    {/* SI HAY PORCENTAJE DE DESCUENTO */}
    {porcentaje > 0 && (
      <Typography
        fontSize={14}
        sx={{
          ml: 1,
        }}
      >
        {FormatoDinero(MontoDescuento(items, porcentaje))}
      </Typography>
    )}
  </Box>
);

/**
 * Método encargado de calcular el subtotal de los elementos.
 * @param items Colección de elementos.
 * @returns Subtotal de los elementos.
 */
function MontoSubtotal(items: ItemInterface[]) {
  const montos = items.map(i => (i.quantity * i.price) || 0);
  const subtotal = montos.reduce((prev, curr) => prev + curr, 0);
  return subtotal;
}

/**
 * Método encargado de calcular el subtotal con porcentaje de decuento aplicado.
 * @param items Colección de los elementos.
 * @param porcentaje Porcentaje de decuento.
 * @returns Subtotal con porcentaje de decuento aplicado.
 */
function MontoDescuento(items: ItemInterface[], porcentaje: number) {
  const subtotal = MontoSubtotal(items);
  const descuento = subtotal * (1 - porcentaje / 100);
  return descuento;
}

/**
 * Método encargado de calcular el monto que corresponde al porcentaje de IVA.
 * @param items Colección de elementos.
 * @param porcentajeDescuento Porcentantaje de decuento.
 * @param porcentajeIva Porcentaje de impuesto al valor agregado.
 * @returns Monto correspondiente al IVA.
 */
function MontoIva(items: ItemInterface[], porcentajeDescuento: number, porcentajeIva: number) {
  const subtotal = MontoDescuento(items, porcentajeDescuento);
  const iva = subtotal * porcentajeIva / 100;
  return iva;
}