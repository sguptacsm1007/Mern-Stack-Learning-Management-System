
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
export default function Librarian(){

    return (
        <div>
          <Form onSubmit={  
              async e=> {
            e.preventDefault();
            let username=e.target.bookname.value;
            let password=e.target.bookdescription.value;
            
            let reqbody={"bookname":username,"description":password};
  
            const response=await fetch("http://localhost:5050/createnewbook/", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
                body: JSON.stringify(reqbody),
            })
            if(!response.ok){
              return;
            }
            alert("Book added successfully")
            
            
            return;
          }}>
        <Container>
        <Form.Label>Name of the Book</Form.Label>
          <Form.Control type="text" id="bookname"></Form.Control>
          <Form.Label>Description of the Book</Form.Label>
          <Form.Control type="text" id="bookdescription"></Form.Control>
          <br></br>
          <Button type="submit" >Add</Button>
          </Container>
          
        
        </Form>
        </div>
      );
  
}