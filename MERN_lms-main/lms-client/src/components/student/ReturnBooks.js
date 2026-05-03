

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';







export default function ReturnBooks(){
 
 
 const [records,SetRecords]=useState([]);

 useEffect(()=>{
  async function getIssuedBooks(){
    const response=await fetch("http://localhost:5050/alreadyissued/"+localStorage.getItem("username").toString());
    if(!response.ok){
      return;
    }
    const records=await response.json()
    ;
    SetRecords(records);
  }
  getIssuedBooks();
  return ;
 },[]);
 
  
const ModifiedBookList=records.map(item=><Card>
   <Card.Title>{item.name} and {item.bookid}</Card.Title>
   <Card.Text>{item.description}</Card.Text>
   <Button value={item.bookid} onClick={
     async (e)=>
     
     {
   
   const response=await fetch("http://localhost:5050/returnbook/"+e.target.value.toString());
   if(!response.ok){
    return;
   }
   alert("Book with id "+e.target.value+"returned");
   return ;
   }
//function handler
}
   
   >Return Book</Button>
  </Card>
)




return (
<>

<Container>{ModifiedBookList}</Container>
</>);
///return <>{records.length}</>;
}
