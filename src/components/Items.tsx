import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, ExpandMore } from "@mui/icons-material";

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAgregar = () => {
    const newItem = {
      id: items.length + 1,
      name: "",
      quantity: 0,
      price: 0,
      link: "",
    }
    setItems([...items, newItem]);
  }

  const handleEliminar = (itemIndex: number) => {
    const filteredItems = items.filter((_, index) => index !== itemIndex);
    setItems(filteredItems);
  }

  const handleEditar = (itemIndex: number, editedItem: Item) => {
    const editedItems = items.map((item, index) => index === itemIndex ? editedItem : item);
    setItems(editedItems);
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="span">
          Elementos del presupuesto
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          onClick={handleAgregar}
          color="primary"
          variant="contained"
        >
          Agregar elemento
        </Button>
        {items.map((item, index) => (
          <Grid container spacing={2} key={item.id} sx={{ my: 2 }}>
            <Grid size={12}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Chip label={`Elemento #${index + 1}`} />

                <Tooltip title="Eliminar">
                  <IconButton onClick={() => handleEliminar(index)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 7 }}>
              <TextField
                label="Nombre"
                value={item.name}
                onChange={(e) => handleEditar(index, { ...item, name: e.target.value })}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 2 }}>
              <TextField
                label="Cantidad"
                value={item.quantity}
                onChange={(e) => handleEditar(index, { ...item, quantity: parseInt(e.target.value) })}
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label="Precio"
                value={item.price}
                onChange={(e) => handleEditar(index, { ...item, price: parseFloat(e.target.value) })}
                type="number"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Link (opcional)"
                value={item.link}
                onChange={(e) => handleEditar(index, { ...item, link: e.target.value })}
                type="url"
                size="small"
                fullWidth
              />
            </Grid>

            {/* SEPARADOR DE FILAS */}
            {index < items.length - 1 && (
              <Grid size={{ xs: 12 }}>
                <Divider orientation="horizontal" flexItem />
              </Grid>
            )}
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  link: string;
}