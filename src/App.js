import './App.css';
import TableComponent from './components/Table';
import SideMenu from './components/SideMenu';
import Container from "react-bootstrap/Container";

//https://www.youtube.com/watch?v=CjqG277Hmgg&t=145s

function App() {

  return (
    <Container fluid>
      <SideMenu />
      <TableComponent />
    </Container>
  );
}

export default App;