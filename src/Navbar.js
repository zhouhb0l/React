import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Nav.Link href="/Tic">Tic-Tac-Toe</Nav.Link>
        <Nav.Link href="/Game24"> Twenty-Four</Nav.Link>
        <Nav.Link href="/LineOrSquare">Line-Or-Square</Nav.Link>
        <Nav.Link href="/GameOfLife">Game-of-Life</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default withRouter(Navigation);
