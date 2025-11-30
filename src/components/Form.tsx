import {
  Autocomplete,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { TIPOS_MONEDA } from "../utils";

export default function Form() {
  return (
    <Paper elevation={5} sx={{ p: 2, my: 2, borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Cliente"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Empresa / Profesional"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="RUT"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Dirección"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Teléfono"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            type="email"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ciudad"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="IVA (%)"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            options={TIPOS_MONEDA}
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
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DatePicker
            label="Fecha de emisión"
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