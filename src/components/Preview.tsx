import { Box, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";
import type { FormInterface, ItemInterface, PreviewPropsInterface } from "../interfaces";
import { FormatoFecha, FormatoDinero, FormatoMoneda, MontoDescuento, MontoSubtotal, MontoIva } from "../utils";

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
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Datos de la empresa
        </Typography>
        <Typography>
          Nombre: {form.empresa.nombre}
        </Typography>
        <Typography>
          RUT: {form.empresa.rut}
        </Typography>
        <Typography>
          Dirección: {form.empresa.direccion}
        </Typography>
        <Typography>
          Teléfono: {form.empresa.telefono}
        </Typography>
        <Typography>
          Email: {form.empresa.email}
        </Typography>
        <Typography>
          Ciudad: {form.empresa.ciudad}
        </Typography>
      </Paper>
    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Datos del cliente
        </Typography>
        <Typography>
          Nombre: {form.cliente.nombre}
        </Typography>
        <Typography>
          RUT: {form.cliente.rut}
        </Typography>
        <Typography>
          Dirección: {form.cliente.direccion}
        </Typography>
        <Typography>
          Teléfono: {form.cliente.telefono}
        </Typography>
        <Typography>
          Email: {form.cliente.email}
        </Typography>
        <Typography>
          Ciudad: {form.cliente.ciudad}
        </Typography>
      </Paper>
    </Grid>

    <Grid size={{ xs: 12 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>
              IVA: {form.iva}%
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>
              Descuento: {form.descuento}%
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>
              Moneda: {FormatoMoneda(form.moneda)}
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
    </Grid>
  </Grid>
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
        {/* SI NO HAY ELEMENTOS */}
        {items.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} sx={{ textAlign: "center" }}>
              Sin elementos
            </TableCell>
          </TableRow>
        )}

        {/* LISTADO DE ELEMENTOS */}
        {items.map((item, index) => (
          <TableRow key={`item_${index}`}>
            <TableCell component="th" scope="row">
              {item.name}
              {item.link && (
                <IconButton
                  onClick={() => window.open(item.link, "_blank")}
                  size="small"
                  sx={{
                    ml: 1,
                  }}
                >
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