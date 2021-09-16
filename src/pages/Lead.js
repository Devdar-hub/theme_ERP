import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
  } from 'reactstrap';
  
const Lead = () => {
    function createLead(e) {
        e.preventDefault();
        var gettoken = localStorage.getItem('token');
        var lead_stage = document.getElementById("lead_stage").value;
        var first_name = document.getElementById("first_name").value;
        var last_name = document.getElementById("last_name").value;
        var phone_no = document.getElementById("phone_no").value;
        var email = document.getElementById("email").value;
        var lead_source = document.getElementById("lead_source").value;
        var company = document.getElementById("company").value;
        var country = document.getElementById("country").value;
        var status = document.getElementById("status").value;
        // var deletedat = document.getElementById("deletedat").value;

         fetch("https://projects.parthvi.tech/api/v1/lead/", {
            method: 'POST',
            headers: ({ 'Content-Type': 'application/json', 
                 'Authorization': 'Token '+gettoken }),
            body: JSON.stringify({
                lead_stage: lead_stage,
                first_name: first_name,
                last_name: last_name,
                phone: phone_no,
                email: email,
                lead_source: lead_source,
                company: company,
                country: country,
                status: status,
                // deleted_at : deletedat

            })
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
            if (data.status_code ===200){
                alert("Lead added Succefully");
            }
        else{
            alert(data.email[0]);
        }})
    }
    return (
        <div>
            <h1>Create Lead</h1>
            {/* <form action="post" onSubmit={createLead}>
                Lead stage : <select id="lead_stage" name="lead_stage">
                    <option value="interested" defaultValue>Interested</option>
                    <option value="not_interested">Not interested</option>
                    <option value="contact_in_future" >Contact in future</option>
                    <option value="irreleventre">Irreleventre</option>
                    <option value="non_responsive">Non responsive</option>
                    <option value="dnd">DND</option>
                </select><br /><br />
                First name : <input type="text" name="" id="first_name" required/><br /><br />
                Last name : <input type="text" name="" id="last_name" required/><br /><br />
                Phone no. : <input type="number" name="" id="phone_no" required/><br /><br />
                Email : <input type="email" name="" id="email" required/><br /><br />
                Lead source : <select name="lead_source" id="lead_source">
                    <option value="fbads" defaultValue>FB Ads</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="cold_call">Cold Call</option>
                    <option value="website">Website</option>
                    <option value="adwords">AdWords</option>
                    <option value="chat">Chat</option>
                </select><br /><br />
                Company : <input type="text" name="" id="company" required/><br /><br />
                Country : <input type="text" name="" id="country" required/><br /><br />
                Status : <select name="status" id="status">
                    <option value="0" defaultValue>0</option>
                    <option value="1">1</option>
                </select><br /><br />
                Deleted At : <input type="date" id="deletedat" /><br /><br />
                
                <Button color="success">success</Button>


            </form> */}

            <Card>
            
            <CardBody>
              <Form action="post" onSubmit={createLead}>
              <FormGroup>
                  <Label for="leadStage">Lead Stage</Label>
                  <Input type="select" name="leadStage" id="lead_stage" required>
                  <option value="interested" defaultValue>Interested</option>
                    <option value="not_interested">Not interested</option>
                    <option value="contact_in_future" >Contact in future</option>
                    <option value="irreleventre">Irreleventre</option>
                    <option value="non_responsive">Non responsive</option>
                    <option value="dnd">DND</option>
                  </Input>
                </FormGroup>
               
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First name"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label for="phone_number">Phone Number</Label>
                  <Input
                    type="number"
                    name="phone_number"
                    id="phone_no"
                    placeholder="Enter Phone Number"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    id="email"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label for="company">Company</Label>
                  <Input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Enter Company Name"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter Country Name"
                  />
                </FormGroup>
                
                
                <FormGroup>
                  <Label for="lead_source">Lead Source</Label>
                  <Input type="select" name="lead_source" id="lead_source">
                  <option value="fbads" defaultValue>FB Ads</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="cold_call">Cold Call</option>
                    <option value="website">Website</option>
                    <option value="adwords">AdWords</option>
                    <option value="chat">Chat</option>
                  </Input>
                </FormGroup>
                
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input type="select" name="status" id="status">
                  <option value="0" defaultValue>0</option>
                    <option value="1">1</option>
                  </Input>
                </FormGroup>
                
                {/* <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="deletedat"
                    placeholder="Date "
                  />
                </FormGroup> */}
                <Button color="success">Create</Button>
              </Form>
            </CardBody>
          </Card>
        </div>
    )
}

export default Lead
