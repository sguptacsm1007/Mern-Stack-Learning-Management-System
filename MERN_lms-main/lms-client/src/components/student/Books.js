
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';







export default function Books(){
 
 
 const [records,SetRecords]=useState([]);

 useEffect(()=>{
  async function getBooks(){
    const response=await fetch("http://localhost:5050/books/");
    if(!response.ok){
      return;
    }
    const records=await response.json()
    ;
    SetRecords(records);
  }
  getBooks();
  return ;
 },[records.length]);
 
  
const ModifiedBookList=records.map(item=><Card>
   <Card.Title>{item.name} and {item.bookid}</Card.Title>
   <Card.Text>{item.description}</Card.Text>
   <Button value={item.bookid} onClick={
     async (e)=>
     
     {
   
   const response=await fetch("http://localhost:5050/available/"+e.target.value.toString());
   if(!response.ok){
    return;
   }
   
   const records=await response.json();
   
   if(records.length>0){
    const responseinner=await fetch("http://localhost:5050/issue/"+e.target.value.toString()+
    "/"+localStorage.getItem("username").toString());
    if(!responseinner.ok){
      alert("book issue failed due to technical glitch at server side");
    }
    else{
      alert("book issued");
    }
   }
   else{
    alert("you cannot issued book");
   }
   return ;
   }}
   
   >Issue Book</Button>
  </Card>
)




return (
<>

<Container>{ModifiedBookList}</Container>
</>);
///return <>{records.length}</>;
}
