import { lazy } from "react";
import { Container, Stack } from "@mui/material";
import UseApp from "./useApp";

const FormComponent = lazy(() => import("./components/Form"));
const ItemsComponent = lazy(() => import("./components/Items"));
const PreviewComponent = lazy(() => import("./components/Preview"));

export default function App() {
  const useApp = UseApp();

  return (
    <Container maxWidth="md">
      <Stack direction={"column"} spacing={2}>
        <FormComponent
          form={useApp.form}
          handleEditarFormulario={useApp.handleEditarFormulario}
        />
        <ItemsComponent
          items={useApp.items}
          handleAgregar={useApp.handleAgregar}
          handleEliminar={useApp.handleEliminar}
          handleEditarElementos={useApp.handleEditarElementos}
        />
        <PreviewComponent
          form={useApp.form}
        />
      </Stack>
    </Container>
  );
}