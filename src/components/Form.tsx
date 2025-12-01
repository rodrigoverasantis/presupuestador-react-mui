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

  /**
   * Método encargado de combinar los datos del formulario con los nuevos datos.
   * @param newData Datos actualizados del formulario.
   */
  const handleEditar = (newData: object) => {
    props.handleEditarFormulario({ ...props.form, ...newData })
  }

  return (
    <Paper elevation={5} sx={{ p: 2, my: 2, borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Cliente"
            value={props.form.cliente}
            onChange={(event) => handleEditar({ cliente: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Empresa / Profesional"
            value={props.form.empresa}
            onChange={(event) => handleEditar({ empresa: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="RUT"
            value={props.form.rut}
            onChange={(event) => handleEditar({ rut: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Dirección"
            value={props.form.direccion}
            onChange={(event) => handleEditar({ direccion: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Teléfono"
            value={props.form.telefono}
            onChange={(event) => handleEditar({ telefono: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            value={props.form.email}
            onChange={(event) => handleEditar({ email: event.target.value })}
            type="email"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ciudad"
            value={props.form.ciudad}
            onChange={(event) => handleEditar({ ciudad: event.target.value })}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="IVA (%)"
            value={props.form.iva}
            onChange={(event) => handleEditar({ iva: event.target.value })}
            type="number"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            options={TIPOS_MONEDA}
            value={props.form.moneda}
            onChange={(_, value) => handleEditar({ moneda: value })}
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
            onChange={(event) => handleEditar({ descuento: event.target.value })}
            type="number"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DatePicker
            label="Fecha de emisión"
            value={dayjs(props.form.fechaEmision)}
            onChange={(value) => handleEditar({ fechaEmision: value })}
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
            onChange={(value) => handleEditar({ fechaVencimiento: value })}
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
            onChange={(event) => handleEditar({ descripcion: event.target.value })}
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