import React,{useState} from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Editlead = () => {
    const [modalIsOpen, setmodalIsOpen] = useState(false);

    var id = 8;
    
    function getData() {


        fetch("https://projects.parthvi.tech/api/v1/lead/" + id + "/", {
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
    
    function edit(e){
        e.preventDefault();
        var gettoken = localStorage.getItem('token');
        var lstage = document.getElementById("lstage").value;
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phoneno = document.getElementById("phoneno").value;
        var email = document.getElementById("email").value;
        var lsource = document.getElementById("lsource").value;
        var company = document.getElementById("company").value;
        var country = document.getElementById("country").value;
        var status = document.getElementById("status").value;

        fetch("https://projects.parthvi.tech/api/v1/lead/"+id+"/",{
            method : 'PUT' ,
            headers : ({'Content-Type': 'application/json',
                        'Authorization' : 'Token '+gettoken}),
            body : JSON.stringify({
               
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
        .then(data => {console.log(data);
                if(data.status_code === 200){
                    alert("updated");
                }
            else{
                alert("error from server");
            }})
    }
    return (
        <div>
              <button onClick={() => {setmodalIsOpen(true); getData()}}>Delete</button>
           <Modal isOpen={modalIsOpen} onRequestClose={()=>setmodalIsOpen(false)}>

           
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
                <button onClick={edit}> edit </button>
                
                
            </form>
                <button onClick={() => {setmodalIsOpen(false)}}>close</button>
                
           </Modal>
            
           
        </div>
    )
}

export default Editlead
