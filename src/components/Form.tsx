import {
  Autocomplete,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TIPOS_MONEDA } from "../utils";
import type { FormPropsInterface } from "../interfaces";

export default function Form(props: FormPropsInterface) {

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Cliente"
            value={props.form.cliente}
            onChange={(event) => props.handleEditarFormulario({ cliente: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Empresa / Profesional"
            value={props.form.empresa}
            onChange={(event) => props.handleEditarFormulario({ empresa: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="RUT"
            value={props.form.rut}
            onChange={(event) => props.handleEditarFormulario({ rut: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Dirección"
            value={props.form.direccion}
            onChange={(event) => props.handleEditarFormulario({ direccion: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Teléfono"
            value={props.form.telefono}
            onChange={(event) => props.handleEditarFormulario({ telefono: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            value={props.form.email}
            onChange={(event) => props.handleEditarFormulario({ email: event.target.value })}
            type="email"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ciudad"
            value={props.form.ciudad}
            onChange={(event) => props.handleEditarFormulario({ ciudad: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="IVA (%)"
            value={props.form.iva}
            onChange={(event) => props.handleEditarFormulario({ iva: event.target.value })}
            type="number"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            options={TIPOS_MONEDA}
            value={props.form.moneda}
            onChange={(_, value) => props.handleEditarFormulario({ moneda: value })}
            getOptionLabel={(option) => `${option.label} (${option.value})`}
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
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Descuento (%)"
            value={props.form.descuento}
            onChange={(event) => props.handleEditarFormulario({ descuento: event.target.value })}
            type="number"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
        <Grid size={{ xs: 12, sm: 6 }}>
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
  );
}