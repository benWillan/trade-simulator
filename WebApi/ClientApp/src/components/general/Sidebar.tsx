import React from "react";
import { Nav } from "react-bootstrap";
import {Button} from "react-bootstrap";

const Sidebar = () => {
  return (
    <div
      className="bg-body-tertiary"
      style={{
        height: "100vh",         // Full height
        width: "56px",          // Sidebar width
        position: "fixed",       // Stick to side
        top: 0,
        right: 0,                 // Change to "right: 0" if you want it on the right
        backgroundColor: "#343a40", // Bootstrap dark color
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
        zIndex: 1,
      }}
    >
      {/* <h4
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        My App
      </h4> */}
      <Nav className="flex-column" variant="pills">
        {/* <Nav.Link href="/" className="text-white">
          <Button style={{width: "80%"}}>C</Button>
        </Nav.Link>
        <Nav.Link href="/about" className="text-white">About</Nav.Link>
        <Nav.Link href="/services" className="text-white">Services</Nav.Link>
        <Nav.Link href="/contact" className="text-white">Contact</Nav.Link> */}
        <div style={{position: "absolute", top: "62px", width: "100%", textAlign: "center"}}>
          <Button style={{width: "80%", backgroundColor: "black"}}>C</Button>
        </div>
        <div style={{position: "absolute", top: "108px", width: "100%", textAlign: "center"}}>
          <Button style={{width: "80%", backgroundColor: "black"}}>C</Button>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
