import { Container } from "@mui/material";
import Form from "./components/Form";
import Items from "./components/Items";
import Preview from "./components/Preview";
import UseApp from "./useApp";

export default function App() {
  const useApp = UseApp();

  return (
    <Container maxWidth="md">
      <Form
        form={useApp.form}
        handleEditarFormulario={useApp.handleEditarFormulario}
      />
      <Items
        items={useApp.items}
        handleAgregar={useApp.handleAgregar}
        handleEliminar={useApp.handleEliminar}
        handleEditarElementos={useApp.handleEditarElementos}
      />
      <Preview
        form={useApp.form}
      />
    </Container>
  );
}