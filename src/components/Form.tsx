import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

export default function Form() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="span">Datos del presupuesto</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Cliente"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Empresa / Profesional"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="RUT"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Dirección"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Teléfono"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Ciudad"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="IVA (%)"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={TIPOS_MONEDA}
              getOptionLabel={(option) => `${option.label} (${option.value})`}
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
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              label="Fecha de emisión"
              slotProps={{
                textField: {
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
                  fullWidth: true,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Descripción del presupuesto"
              fullWidth
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

const TIPOS_MONEDA = [
  { label: "Dólar", value: "USD" },
  { label: "Peso chileno", value: "CLP" },
  { label: "Unidad de fomento", value: "UF" },
];