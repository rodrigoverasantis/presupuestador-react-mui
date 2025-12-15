import { lazy } from "react";
import { Container, Stack, Tab, Tabs } from "@mui/material";
import UseApp from "./useApp";

const FormComponent = lazy(() => import("./components/Form"));
const ItemsComponent = lazy(() => import("./components/Items"));
const PreviewComponent = lazy(() => import("./components/Preview"));
const PDFComponent = lazy(() => import("./components/PDF"));

export default function App() {
  const useApp = UseApp();

  return (
    <Container maxWidth="md">
      <Tabs
        value={useApp.tabIndex}
        onChange={(_, value) => useApp.setTabIndex(value)}
        centered
        sx={{ pb: 1 }}
      >
        <Tab label="Formulario" />
        <Tab label="Vista previa" />
        <Tab label="PDF" />
      </Tabs>

      {/* PESTAÑA 0 */}
      {useApp.tabIndex === 0 && (
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
        </Stack>
      )}

      {/* PESTAÑA 1 */}
      {useApp.tabIndex === 1 && (
        <PreviewComponent
          form={useApp.form}
          items={useApp.items}
        />
      )}

      {/* PESTAÑA 2 */}
      {useApp.tabIndex === 2 && (
        <PDFComponent
          form={useApp.form}
          items={useApp.items}
        />
      )}
    </Container>
  );
}