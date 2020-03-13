import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Contacts = props => {

    const [{first_name, last_name, contact_email, contact_phone_number, relationship, has_access, password}, setValues, resetValues]=useInputValue({
        first_name: '',
        last_name: '',
        contact_email: '',
        contact_phone_number: '',
        relationship: '',
        has_access: '',
        password: ''
    }, [])

    const [contact_list, setList]=useState([]);

    const getContacts = () => 
        axios.get(`/api/contacts${props.user.patient_id}`)
        .then(results => setList(results.data))
        .catch(err => console.log(err))

    useEffect(() => {
        getContacts();
    }, [])

    const deleteContact = (id) => {
        axios.delete(`/api/contacts${id}`)
        .then(() => {
          getContacts()
        })
        .catch(err => console.log(err));
    }

    const [access, setAccess]=useState(false);

        return(
            <main id='meds-main'>
                <form 
                    onSubmit={e => {
                        e.preventDefault()
                        axios.post(`/api/contacts${props.user.patient_id}`, {first_name, last_name, contact_email, contact_phone_number, relationship, has_access, password})
                        .then(results => {
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
                            name='first_name'
                            placeholder='Contact Name'
                            value={first_name}
                            onChange={setValues}
                            />
                            <input 
                            name='last_name'
                            placeholder='Contact Name'
                            value={last_name}
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
                            <input 
                            name='access'
                            type='checkbox'
                            checked={() => {setAccess(!access)}}
                            onChange={setValues}
                            value={has_access}
                            />
                            {access ?
                            <input 
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={setValues}
                            />
                            : null}
                            <button type='submit'>Add New</button>
                        </div>
                    </div>
                </form>

                {contact_list.map((e, i) => (
                    <div key={i}>
                        <p>{e.first_name}{e.last_name}</p>
                        <p>{e.relationship}</p>
                        <p>{e.email}</p>
                        <p>{e.phone_number}</p>
                        <button onClick={() => deleteContact(e.contact_id)}>Remove</button>
                    </div>
                ))}

            </main>
        )
    }

    function mapStateToProps (state) {
        return {user: state.userReducer.user}
    }
    
    export default connect(mapStateToProps, {getUser})(Contacts);