import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import Modal from 'react-modal';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,ModalBody, ModalFooter,ModalHeader,} from 'reactstrap';
import HorizontalAvatarList from 'components/HorizontalAvatarList';

import './global';
Modal.setAppElement('#root');


function Admin() {
    
    // modal open close
    const [modalIsOpen, setmodalIsOpen] = useState(false);

    // to get contact and lead lists
    const [leads_list, setLeadsList] = useState(null);
    const [contact_list, setContactList] = useState(null);

    // show and hide list
    const [contact, setShowContactList] = useState(false);
    const [lead, setShowLeadList] = useState(true);

    // get token
    var gettoken = localStorage.getItem('token');
    // functions of lead list and contact list using useeffect
    useEffect(() => {
        getLeadlist();
        async function getLeadlist() {
            var gettoken = localStorage.getItem("token");

            const response = await fetch(
                "https://projects.parthvi.tech/api/v1/lead",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Token " + gettoken,
                    },
                }
            );
            const data = await response.json();
            if (data.status_code === 200) {
                console.log(27, "success data")
            } else {
                document.getElementById("errordiv").innerHTML = "Error from server";
            }
            console.log(25, data);
            setLeadsList(data.data);
        }

        getContactlist();
        async function getContactlist() {
            var gettoken = localStorage.getItem("token");

            const response = await fetch(
                "https://projects.parthvi.tech/api/v1/contact/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Token " + gettoken,
                    },
                }
            );
            const data = await response.json();
            if (data.status_code === 200) {
                console.log(51, "success data")
            } else {
                document.getElementById("errordiv").innerHTML = "Error from server";
            }
            console.log(74, data);
            setContactList(data.data);
        }
    }, []);


    function getLeadData(e) {

        global.id = e.target.parentElement.parentElement.children[0].innerHTML;
        console.log(73, global.id);
        fetch("https://projects.parthvi.tech/api/v1/lead/" + global.id + "/", {
            method: 'GET',
            headers: ({ 'Content-Type': 'application/json' })
        }).then(Response => Response.json())
            .then(data => {
                console.log(data);
                document.getElementById("lstage").option = data.data[0].lead_stage;
                document.getElementById("fname").value = data.data[0].first_name;
                document.getElementById("lname").value = data.data[0].last_name;
                document.getElementById("phoneno").value = data.data[0].phone;
                document.getElementById("email").value = data.data[0].email;
                document.getElementById("lsource").option = data.data[0].lead_source;
                document.getElementById("company").value = data.data[0].company;
                document.getElementById("country").value = data.data[0].country;
                document.getElementById("status").value = data.data[0].status;
                // var deletedat = document.getElementById("deletedat").value=data.data[0].deletedat;
            })
    }
    var id;
    function editLead(e) {
        e.preventDefault();

        var lstage = document.getElementById("lstage").value;
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phoneno = document.getElementById("phoneno").value;
        var email = document.getElementById("email").value;
        var lsource = document.getElementById("lsource").value;
        var company = document.getElementById("company").value;
        var country = document.getElementById("country").value;
        var status = document.getElementById("status").value;

        fetch("https://projects.parthvi.tech/api/v1/lead/" + global.id + "/", {
            method: 'PUT',
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + gettoken
            }),
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
        }).then(Response => Response.json())
            .then(data => {
                console.log(data);
                if (data.status_code === 200) {
                    alert("updated");
                    global.id = "";
                }
                else {
                    alert(data.email[0]);
                    global.id = "";
                }
            })
    }

    function convertid(e) {
        global.id = e.target.parentElement.parentElement.children[0].innerHTML;
        console.log(global.id);
        localStorage.setItem('Convertid', global.id);
    }

    // Functions to delete lead
    function setleaddeleteid(e) {
        global.id = e.target.parentElement.parentElement.children[0].innerHTML;
        console.log(global.id);
    }
    function deleteLead(e) {

        fetch("https://projects.parthvi.tech/api/v1/lead/" + global.id + "/", {
            method: "DELETE",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + gettoken
            })
        }).then(Response => Response.json())
            .then(data => {
                console.log(data);
                if (data.status_code === 200) {
                    alert("Deleted");
                }
                else {
                    alert("error from server");
                }
            })
    }
    const [deletemodalIsOpen, setdeletemodalIsOpen] = useState(false)

    // functions to delete contact
    function deleteContact() {
        fetch("https://projects.parthvi.tech/api/v1/contact/" + global.id + "/", {
            method: "DELETE",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + gettoken
            })
        }).then(Response => Response.json())
            .then(data => {
                console.log(data);
                if (data.status_code === 200) {
                    alert("contact Deleted");
                }
                else {
                    alert("error from server");
                }
            })
    }

    const [contactdeletemodalIsOpen, setcontactdeletemodalIsOpen] = useState(false)

    function setcontactdeleteid(e) {
        global.id = e.target.parentElement.parentElement.children[0].innerHTML;
        console.log(global.id);
    }
    function logout() {
        localStorage.clear();
        window.location = "/";
    }

    return (
        <div>
            {/* buttons to show and hide lists */}
            {/* <button onClick={() => { setShowContactList(false); setShowLeadList(true) }}>Lead list </button> */}
            <Button color="info" onClick={() => { setShowContactList(false); setShowLeadList(true) }}>Lead list </Button>     
            {/* <button onClick={() => { setShowContactList(true); setShowLeadList(false) }}>Contact list </button> */}
            <Button color="info" onClick={() => { setShowContactList(true); setShowLeadList(false) }}>Contact list</Button>
            {/* <Button color="danger" onClick={logout}>Logout</Button> */}
            {/* div for lead list */}
            {lead ?
                <div id="id1">
                    <h1>lead List</h1>
                    <Link to="Lead"><Button color="secondary">Add Lead</Button></Link><br /><br />
                    <Row >
                        <Col>
                            <Card className="mb-3">
                                <CardHeader></CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Card body>
                                                <Table id="leadtable">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ border: "2px solid black" }}>ID</th>
                                                            <th style={{ border: "2px solid black" }}>First name</th>
                                                            <th style={{ border: "2px solid black" }}>Last name</th>
                                                            <th style={{ border: "2px solid black" }}>Lead source</th>
                                                            <th style={{ border: "2px solid black" }}>Lead stage</th>
                                                            <th style={{ border: "2px solid black" }}>Phone No.</th>
                                                            <th style={{ border: "2px solid black" }}>Convert</th>
                                                            <th style={{ border: "2px solid black" }}>Edit</th>
                                                            <th style={{ border: "2px solid black" }}>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody  >
                                                        {leads_list &&
                                                            leads_list.map(function (item, index) {
                                                                return (
                                                                    <tr key={index} >
                                                                        <td style={{ border: "2px solid black" }}>{item.id}</td>
                                                                        <td style={{ border: "2px solid black" }}>{item.first_name}</td>
                                                                        <td style={{ border: "2px solid black" }}>{item.last_name}</td>
                                                                        <td style={{ border: "2px solid black" }}>{item.lead_source}</td>
                                                                        <td style={{ border: "2px solid black" }}>{item.lead_stage}</td>
                                                                        <td style={{ border: "2px solid black" }}>{item.phone}</td>
                                                                        <td style={{ border: "2px solid black" }}><Button color="primary" onClick={(Event) => { window.location = "Convert"; convertid(Event) }}>Convert</Button></td>
                                                                        <td style={{ border: "2px solid black" }}><Button color="warning"  onClick={(Event) => { setmodalIsOpen(true); getLeadData(Event) }}>Edit</Button></td>
                                                                        <td style={{ border: "2px solid black" }}><Button color="danger"  onClick={(Event) => { setdeletemodalIsOpen(true); setleaddeleteid(Event) }}>Delete</Button></td>
                                                                    </tr>
                                                                );
                                                            })}

                                                    </tbody>
                                                </Table>
                                            </Card>
                                        </Col>


                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
                : null}

            {/* div for contact list        */}
            {contact ?
                <div id="id2">
                    <h1>Contact List</h1>
                    <Link to="Contact"><Button color="secondary">Add Contact</Button></Link><br /><br />
                    
                    <Row >
                        <Col>
                            <Card className="mb-3">
                                <CardHeader></CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Card body>
                                                <Table id="contacttable">
                                                <thead>
                            <tr>
                                <th style={{ border: "2px solid black" }}>ID</th>
                                <th style={{ border: "2px solid black" }}>First name</th>
                                <th style={{ border: "2px solid black" }}>Last name</th>
                                <th style={{ border: "2px solid black" }}>Lead source</th>
                                <th style={{ border: "2px solid black" }}>Lead stage</th>
                                <th style={{ border: "2px solid black" }}>Phone No.</th>
                                <th style={{ border: "2px solid black" }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contact_list &&
                                contact_list.map(function (item, index) {
                                    return (
                                        <tr key={index}>
                                            <td style={{ border: "2px solid black" }}>{item.id}</td>
                                            <td style={{ border: "2px solid black" }}>{item.first_name}</td>
                                            <td style={{ border: "2px solid black" }}>{item.last_name}</td>
                                            <td style={{ border: "2px solid black" }}>{item.lead_source}</td>
                                            <td style={{ border: "2px solid black" }}>{item.lead_stage}</td>
                                            <td style={{ border: "2px solid black" }}>{item.phone}</td>
                                            <td style={{ border: "2px solid black" }}><Button color="danger"   onClick={(Event) => { setcontactdeletemodalIsOpen(true); setcontactdeleteid(Event) }}>Delete</Button></td>
                                            
                                        </tr>
                                    );
                                })}

                        </tbody>
                                                </Table>
                                            </Card>
                                        </Col>


                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                : null}

            {/* div for any errors  */}
            <div id="errordiv"></div>

            {/* modal for edit lead */}

            <Modal isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)}>


                <form action="post" >
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
                    {/* <button onClick={() => {setmodalIsOpen(false); edit}}>edit</button> */}
                    <Button color="warning" onClick={editLead}> edit </Button>


                </form>
                <Button color="danger" onClick={() => { { setmodalIsOpen(false); global.id = ""; } }}>close</Button>

            </Modal>
            {/* delete lead modal */}
            <Modal isOpen={deletemodalIsOpen} onRequestClose={() => setdeletemodalIsOpen(false)}>

                Are you sure you want to delete
                <button onClick={() => { setdeletemodalIsOpen(false) }}>close</button>
                <button onClick={() => { setdeletemodalIsOpen(false); deleteLead() }}>delete</button>
            </Modal>

            {/* delete contact modal */}
            <Modal isOpen={contactdeletemodalIsOpen} onRequestClose={() => setcontactdeletemodalIsOpen(false)}>

                Are you sure you want to delete
                <button onClick={() => { setcontactdeletemodalIsOpen(false) }}>close</button>
                <button onClick={() => { setcontactdeletemodalIsOpen(false); deleteContact() }}>delete</button>
            </Modal>

           
        </div>
    );
}

export default Admin;