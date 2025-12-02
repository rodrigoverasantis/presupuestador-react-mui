import { Container } from "@mui/material";
import UseApp from "./useApp";
import { lazy } from "react";

const FormComponent = lazy(() => import("./components/Form"));
const ItemsComponent = lazy(() => import("./components/Items"));
const PreviewComponent = lazy(() => import("./components/Preview"));

export default function App() {
  const useApp = UseApp();

  return (
    <Container maxWidth="md">
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
    </Container>
  );
}