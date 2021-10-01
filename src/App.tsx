import React from 'react';

import './App.scss';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import SequencesList from './components/SequencesList/SequencesList';
import { Route, Switch } from 'react-router';
import Dialog from './components/Dialog/Dialog';
import Sequence from './components/Sequence/Sequence';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">LD49 Dialogs editor</Navbar.Brand>
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
                <Dialog />
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
