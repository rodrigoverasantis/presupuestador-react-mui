import { useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import type { ItemsPropsInterface } from "../interfaces";
import { FormatoDinero } from "../utils";

export default function Items(props: ItemsPropsInterface) {
  const total = useMemo(() => props.items.reduce((prev, curr) => prev + (curr.quantity * curr.price), 0), [props.items]);

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        {/* BOTÓN PARA AGREGAR ELEMENTOS */}
        <Button
          onClick={props.handleAgregar}
          variant="contained"
          color="primary"
          size="small"
        >
          Agregar elemento
        </Button>

        {/* TOTAL DE LOS ELEMENTOS */}
        <Chip
          label={`Total ${FormatoDinero(total)}`}
          variant="filled"
          color="primary"
          size="medium"
          sx={{
            fontWeight: "bold"
          }}
        />
      </Box>

      {/* SI NO HAY ELEMENTOS */}
      {props.items.length === 0 && (
        <Typography alignSelf={"center"}>
          Sin elementos
        </Typography>
      )}

      {/* LISTADO DE ELEMENTOS */}
      {props.items.map((item, index) => (
        <Paper variant="outlined" sx={{ p: 2, my: 2 }} key={`elemento_${index}`}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Box display={"flex"}>
                <Box sx={{ flexGrow: 1 }}>
                  {/* NÚMERO INDICADOR DEL ELEMENTO */}
                  <Chip
                    label={`Elemento #${index + 1}`}
                    color="primary"
                    variant="outlined"
                    size="medium"
                    sx={{
                      fontWeight: "bold"
                    }}
                  />

                  {/* BOTÓN PARA ELIMINAR */}
                  <Tooltip title="Eliminar elemento" sx={{ mx: 2 }}>
                    <IconButton
                      onClick={() => props.handleEliminar(index)}
                      color="default"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* SUBTOTAL DEL ELEMENTO */}
                <Chip
                  label={`Subtotal ${FormatoDinero(item.quantity * item.price)}`}
                  variant="outlined"
                  color="primary"
                  size="medium"
                  sx={{
                    fontWeight: "bold"
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 7 }}>
              <TextField
                label="Nombre"
                value={item.name}
                onChange={(event) => props.handleEditarElementos(index, { ...item, name: event.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
              <TextField
                label="Cantidad"
                value={item.quantity}
                onChange={(event) => props.handleEditarElementos(index, { ...item, quantity: parseInt(event.target.value) || 1 })}
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label="Precio"
                value={item.price}
                onChange={(event) => props.handleEditarElementos(index, { ...item, price: parseFloat(event.target.value) || 0 })}
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Link (opcional)"
                value={item.link}
                onChange={(event) => props.handleEditarElementos(index, { ...item, link: event.target.value })}
                type="url"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  );
}