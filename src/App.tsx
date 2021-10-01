import React from 'react';

import './App.scss';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import SequencesList from './components/SequencesList/SequencesList';
import { Route, Switch } from 'react-router';
import Item from './components/Item/Item';
import Sequence from './components/Sequence/Sequence';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ManualEditor from './components/ManualEditor/ManualEditor';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">LD49 Dialogs editor</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <ManualEditor />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-2">
        <Row>
          <Col md={4}>
            <SequencesList />
          </Col>
          <Col>
            <Switch>
              <Route path="/sequence/:sequenceName/item/:itemIndex" key={Date.now()}>
                <Item />
              </Route>
              <Route path="/sequence/:sequenceName" key={Date.now()}>
                <Sequence />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
