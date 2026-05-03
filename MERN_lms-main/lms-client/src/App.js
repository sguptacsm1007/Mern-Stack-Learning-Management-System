


import Books from "./components/student/Books"
import ReturnBooks from "./components/student/ReturnBooks";
import Librarian from "./components/librarian/Librarian";
import { useState } from 'react';
 // eslint-disable-next-line
import { useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
export default function App(){
   
 // eslint-disable-next-line
    
 
    // eslint-disable-next-line
   const[loggedin,setLogin]=useState(false);

if(loggedin){

if(parseInt(localStorage.getItem("role"))===1){
   return <>
   
   <Navbar  bg="primary" data-bs-theme="dark">
   <Navbar.Brand >Library Management System</Navbar.Brand>
   
   <Nav.Item  className="ms-auto">
   {localStorage.getItem("username")}
   <Button onClick={()=>setLogin(false)}>Logout
   </Button>
      </Nav.Item>
    
   </Navbar>
   <br></br>
   <Container>
    <Row>
    <Col><Card><Card.Header> Issue Book Section </Card.Header></Card></Col>
    <Col><Card><Card.Header> Return Book Section </Card.Header></Card></Col>
      
    </Row>
    <br></br>
    <Row>
    <Col>
   <Books ></Books>
  </Col>
   
   <Col><ReturnBooks></ReturnBooks></Col>
   </Row>
   </Container>
   </>
  
}
else if(parseInt(localStorage.getItem("role"))===2){

  return <>
  <Navbar  bg="primary" data-bs-theme="dark">
   <Navbar.Brand >Library Management System</Navbar.Brand>
   
   <Nav.Item  className="ms-auto">
   {localStorage.getItem("username")}
   <Button onClick={()=>setLogin(false)}>Logout
   </Button>
      </Nav.Item>
    
   </Navbar>
  <br></br>
  
  <Librarian></Librarian></>

}
else{
  return<h4>Some problem.{localStorage.getItem("role")}</h4>
}
}
else{

   return (
      <div>
        <Navbar  bg="primary" data-bs-theme="dark">
   <Navbar.Brand >Library Management System</Navbar.Brand>
   
   
   </Navbar>
  <br></br>

        <Form onSubmit={  
            async e=> {
          e.preventDefault();
          let username=e.target.username.value;
          let password=e.target.pwd.value;
          
          let reqbody={userid:username,pwd:password}

          const response=await fetch("http://localhost:5050/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
              body: JSON.stringify(reqbody),
          })
          if(!response.ok){
            return;
          }
          
          const results=await response.json();
          if(results.length===1){
            setLogin(true);
            localStorage.setItem("username",results[0].userid);
            localStorage.setItem("role",results[0].role);
          }
          else{
            alert("Please login with correct credentials");
            localStorage.setItem("username","");
            localStorage.setItem("role",0);
          }
          
          return;
        }}>
          <Container>
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" id="username"></Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="pwd"></Form.Control>
          <br></br>
          <Button type="submit" >Login</Button>
         </Container>
      <br></br>
      </Form>
      </div>
    );

}


}
