import './App.css';
import Table from './components/Table';
import SideMenu from './components/SideMenu';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";

//https://www.youtube.com/watch?v=CjqG277Hmgg&t=145s

function App() {

  return (
    <>
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <SideMenu />
        </Col>
        <Col  xs={10} id="page-content-wrapper">
          <Table />
        </Col> 
      </Row>
    </Container>
   </>
  );
}

export default App;