import React,{useState} from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');


const Deletelead = () => {
    var gettoken = localStorage.getItem('token');
    var id = 2;
    function deleteLead(){
        fetch("https://projects.parthvi.tech/api/v1/contact/2",{
            method : "DELETE",
            headers : ({'Content-Type' : 'application/json',
                        'Authorization':'Token '+gettoken})
        }).then(Response => Response.json())
            .then(data => {console.log(data);
            if(data.status_code === 200){
                alert("Deleted");
            }
        else{
            alert("error from server");
        }})
    }

    const [modalIsOpen, setmodalIsOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setmodalIsOpen(true)}>Delete</button>
           <Modal isOpen={modalIsOpen} onRequestClose={()=>setmodalIsOpen(false)}>

                Are you sure you want to delete
                <button onClick={() => {setmodalIsOpen(false)}}>close</button>
                <button onClick={() => {setmodalIsOpen(false); deleteLead()}}>delete</button>
           </Modal>
           
        </div>
    )
} 

export default Deletelead
