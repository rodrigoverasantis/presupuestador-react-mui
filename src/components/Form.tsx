import { Autocomplete, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TIPOS_MONEDA } from "../utils";
import type { FormPropsInterface } from "../interfaces";

export default function Form(props: FormPropsInterface) {

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        {/* DATOS DE LA EMPRESA */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5">
                Datos de la empresa
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Nombre"
                value={props.form.empresa.nombre}
                onChange={(event) => props.handleEditarEmpresa({ nombre: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="RUT"
                value={props.form.empresa.rut}
                onChange={(event) => props.handleEditarEmpresa({ rut: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Email"
                value={props.form.empresa.email}
                onChange={(event) => props.handleEditarEmpresa({ email: event.target.value })}
                type="email"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Teléfono"
                value={props.form.empresa.telefono}
                onChange={(event) => props.handleEditarEmpresa({ telefono: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Ciudad"
                value={props.form.empresa.ciudad}
                onChange={(event) => props.handleEditarEmpresa({ ciudad: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Dirección"
                value={props.form.empresa.direccion}
                onChange={(event) => props.handleEditarEmpresa({ direccion: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid >

      {/* DATOS DEL CLIENTE */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5">
                Datos del cliente
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Nombre"
                value={props.form.cliente.nombre}
                onChange={(event) => props.handleEditarCliente({ nombre: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="RUT"
                value={props.form.cliente.rut}
                onChange={(event) => props.handleEditarCliente({ rut: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Email"
                value={props.form.cliente.email}
                onChange={(event) => props.handleEditarCliente({ email: event.target.value })}
                type="email"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Teléfono"
                value={props.form.cliente.telefono}
                onChange={(event) => props.handleEditarCliente({ telefono: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Ciudad"
                value={props.form.cliente.ciudad}
                onChange={(event) => props.handleEditarCliente({ ciudad: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField
                label="Dirección"
                value={props.form.cliente.direccion}
                onChange={(event) => props.handleEditarCliente({ direccion: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid >

      {/* DATOS GENERALES */}
      <Grid size={{ xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5">
                Datos generales
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <TextField
                label="IVA (%)"
                value={props.form.iva}
                onChange={(event) => props.handleEditarFormulario({ iva: event.target.value })}
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <TextField
                label="Descuento (%)"
                value={props.form.descuento}
                onChange={(event) => props.handleEditarFormulario({ descuento: event.target.value })}
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <Autocomplete
                options={TIPOS_MONEDA}
                value={props.form.moneda}
                onChange={(_, value) => props.handleEditarFormulario({ moneda: value })}
                getOptionLabel={(option) => `${option.label} (${option.value})`}
                noOptionsText="Sin opciones"
                size="small"
                fullWidth
                renderInput={(params) => (
                  <TextField
                    label="Moneda"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <DatePicker
                label="Fecha de emisión"
                value={dayjs(props.form.fechaEmision)}
                onChange={(value) => props.handleEditarFormulario({ fechaEmision: value })}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <DatePicker
                label="Fecha de vencimiento"
                value={dayjs(props.form.fechaVencimiento)}
                onChange={(value) => props.handleEditarFormulario({ fechaVencimiento: value })}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Descripción del presupuesto"
                value={props.form.descripcion}
                onChange={(event) => props.handleEditarFormulario({ descripcion: event.target.value })}
                size="small"
                multiline
                rows={2}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid >
    </Grid >
  );
}