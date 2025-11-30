import { Fragment } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { ItemsPropsInterface } from "../interfaces";
import { FormatoDinero } from "../utils";

export default function Items(props: ItemsPropsInterface) {

  return (
    <>
      <Button
        onClick={props.handleAgregar}
        color="primary"
        variant="contained"
      >
        Agregar elemento
      </Button>
      {props.items.map((item, index) => (
        <Fragment key={`elemento_${index}`}>
          <Paper elevation={5} sx={{ p: 2, my: 2, borderRadius: 4 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Chip
                    label={`Elemento #${index + 1}`}
                    size="medium"
                  />

                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => props.handleEliminar(index)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 7 }}>
                <TextField
                  label="Nombre"
                  value={item.name}
                  onChange={(e) => props.handleEditar(index, { ...item, name: e.target.value })}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField
                  label="Cantidad"
                  value={item.quantity}
                  onChange={(e) => props.handleEditar(index, { ...item, quantity: parseInt(e.target.value) })}
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  label="Precio"
                  value={item.price}
                  onChange={(e) => props.handleEditar(index, { ...item, price: parseFloat(e.target.value) })}
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Link (opcional)"
                  value={item.link}
                  onChange={(e) => props.handleEditar(index, { ...item, link: e.target.value })}
                  type="url"
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid size={12}>
                <Box display={"flex"} justifyContent={"end"}>
                  <Chip
                    label={`Subtotal $${FormatoDinero(item.quantity * item.price)}`}
                    variant="filled"
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: "bold"
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fragment>
      ))}
    </>
  );
}