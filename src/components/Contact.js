import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Contacts = props => {
    const [{contact_name, contact_email,contact_phone_number, relationship}, setValues, resetValues]=useInputValue({
        contact_name: '',
        contact_email: '',
        contact_phone_number: '',
        relationship: ''
    },[])
    const [contact_list, setList]=useState([])
    const getContacts = () => axios.get(`/api/contacts${props.user.patient_id}`).then(results=>setList(results.data)).catch(err=>console.log(err))
    useEffect((e)=>{
        // console.log('hit')
        getContacts();
    }, [])
    const deleteContact =(id)=>{
        console.log(id)
        axios.delete (`/api/contacts/${id}`)
        .then(results=> {
          getContacts()
        }).catch(err=>console.log(err))
    }
    const [toggle, setToggle]=useState(false);
        return(
            <main id='meds-main'>
                <form 
                    onSubmit={e=>{
                        e.preventDefault()
                        console.log(contact_name, contact_email, contact_phone_number, relationship)
                        axios.post(`/api/contacts${props.user.patient_id}`, {contact_name, contact_email, contact_phone_number, relationship}).then(results=>{
                            setList(results.data)
                            resetValues();
                            getContacts();             
                    })
                            .catch(err=>console.log(err))}
                    }>

                    <div className='add-medication-container'>  
                        <h3>Contacts</h3> 
                        <div>
                            <input 
                            name='contact_name'
                            placeholder='Contact Name'
                            value={contact_name}
                            onChange={setValues}
                            />
                            <input 
                            name='contact_email'
                            placeholder='Contact Email'
                            value={contact_email}
                            onChange={setValues}
                            />
                            <input 
                            name='contact_phone_number'
                            placeholder='Contact Phone Number'
                            value={contact_phone_number}
                            onChange={setValues}
                            />
                            <input 
                            name='relationship'
                            placeholder='Relationship'
                            value={relationship}
                            onChange={setValues}
                            />
                            <button type='submit'>Add New</button>
                        </div>
                    </div>
                    </form>
                    <div className='medication-container'>
                        <div className='meds-header'>
                            <p>Name</p>
                            <p>Email</p>
                            <p>Phone Number</p>
                            <p>Relationship</p>
                        </div>
                    {contact_list.map((contact, index)=>(
                        <div key={index} className='med-history'>
                            <p className='med-action'>{contact.contact_name}<p>{toggle ? <actionbutton onClick={()=> {
                            setToggle(!toggle)
                            // editAllergy(allergy)
                            }}>Save</actionbutton>:<actionbutton onClick={()=>setToggle(!toggle)}>Edit</actionbutton>} 
                            <actionbutton
                            onClick={() => {
                                console.log(contact)
                                deleteContact(contact.contact_id)
                            }}
                            >Delete </actionbutton></p></p>
                            <p>{contact.relationship}</p>
                            <p>{contact.contact_email}</p>
                                    
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    function mapStateToProps (state) {
        return {user: state.userReducer.user}
    }
    
    export default connect(mapStateToProps, {getUser})(Contacts);