import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function Form() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="span">Datos del presupuesto</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid size={6}>AAA</Grid>
          <Grid size={6}>BBB</Grid>
          <Grid size={6}>CCC</Grid>
          <Grid size={6}>DDD</Grid>
          <Grid size={6}>EEE</Grid>
          <Grid size={6}>FFF</Grid>
          <Grid size={6}>GGG</Grid>
          <Grid size={6}>HHH</Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
