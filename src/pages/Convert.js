import React from 'react'
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
const Convert = () => {
    
    var gettoken = localStorage.getItem("token");
    var id = localStorage.getItem("Convertid");
    
    function getData() {


        fetch("https://projects.parthvi.tech/api/v1/lead/" + id + "/", {
            method: 'GET',
            headers: ({ 'Content-Type': 'application/json' })
        }).then(Response => Response.json())
            .then(data => {
                console.log(data);
                console.log();
                document.getElementById("lstage").option = data.data[0].lstage;
                document.getElementById("fname").value = data.data[0].fname;
                document.getElementById("lname").value = data.data[0].lname;
                document.getElementById("phoneno").value = data.data[0].phone;
                document.getElementById("email").value = data.data[0].email;
                document.getElementById("lsource").option = data.data[0].lsource;
                document.getElementById("company").value = data.data[0].company;
                document.getElementById("country").value = data.data[0].country;
                document.getElementById("status").value = data.data[0].status;
                // var deletedat = document.getElementById("deletedat").value=data.data[0].deletedat;
            })
    }
    function convertTocontact(e) {
        e.preventDefault(e);
        var lstage = document.getElementById("lstage").value;
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phoneno = document.getElementById("phoneno").value;
        var email = document.getElementById("email").value;
        var lsource = document.getElementById("lsource").value;
        var company = document.getElementById("company").value;
        var country = document.getElementById("country").value;
        var status = document.getElementById("status").value;

        fetch("https://projects.parthvi.tech/api/v1/lead/convert/" + id + "/", {
            method: 'PATCH',
            headers: ({ 'Content-Type': 'application/json',
                        'Authorization':'Token '+gettoken }),
            body: JSON.stringify({
                lead_stage: lstage,
                first_name: fname,
                last_name: lname,
                phone: phoneno,
                email: email,
                lead_source: lsource,
                company: company,
                country: country,
                status: status,
                // deleted_at : deletedat
            })
        }).then(response => response.json())
        .then(data => {console.log(data);
        if(data.status_code ===200){
            alert("convert successfully")
        }
    else{
        alert("error from server");
    }})
    }
    return (
        <div>
            <h1>Convert to Contact</h1>
            {getData()}
            <form action="post" onSubmit={convertTocontact}>
                Lead stage : <select id="lstage" name="lstage">
                    <option value="interested" defaultValue>Interested</option>
                    <option value="not_interested">Not interested</option>
                    <option value="contact_in_future" >Contact in future</option>
                    <option value="irreleventre">Irreleventre</option>
                    <option value="non_responsive">Non responsive</option>
                    <option value="dnd">DND</option>
                </select><br /><br />
                First name : <input type="text" name="" id="fname" required /><br /><br />
                Last name : <input type="text" name="" id="lname" required /><br /><br />
                Phone no. : <input type="number" name="" id="phoneno" required /><br /><br />
                Email : <input type="email" name="" id="email" required /><br /><br />
                Lead source : <select name="lsource" id="lsource">
                    <option value="fbads" defaultValue>FB Ads</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="cold_call">Cold Call</option>
                    <option value="website">Website</option>
                    <option value="adwords">AdWords</option>
                    <option value="chat">Chat</option>
                </select><br /><br />
                Company : <input type="text" name="" id="company" required /><br /><br />
                Country : <input type="text" name="" id="country" required /><br /><br />
                Status : <select name="status" id="status">
                    <option value="0" defaultValue>0</option>
                    <option value="1">1</option>
                </select><br /><br />
                Deleted At : <input type="date" id="deletedat" /><br /><br />
                <Button color="success">Convert</Button>


            </form>
        </div>
    )
}

export default Convert
