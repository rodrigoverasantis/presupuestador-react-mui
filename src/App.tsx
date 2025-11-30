import { Container } from "@mui/material";
import Form from "./components/Form";
import Items from "./components/Items";
import Preview from "./components/Preview";

export default function App() {
  return (
    <Container maxWidth="md">
      <Form />
      <Items />
      <Preview />
    </Container>
  );
}
