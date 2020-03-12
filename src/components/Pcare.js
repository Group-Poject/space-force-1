import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Pcare = props => {
    const [{first_name, last_name, phone_number, email, address}, setValues, resetValues]=useInputValue({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: ''
    },[])
    const [pcare_list, setList]=useState([])
    const getPcare = () => axios.get(`/api/pcare${props.user.patient_id}`).then(results=>setList(results.data)).catch(err=>console.log(err))
    useEffect((e)=>{
        // console.log('hit')
        getPcare();
    }, [])
    const deletePcare =(id)=>{
        console.log(id)
        axios.delete (`/api/pcare/${id}`)
        .then(results=> {
          getPcare()
        }).catch(err=>console.log(err))
    }
    const [toggle, setToggle]=useState(false);
        return(
            <main id='meds-main'>
                <form 
                    onSubmit={e=>{
                        e.preventDefault()
                        axios.post(`/api/pcare${props.user.patient_id}`, {first_name, last_name, phone_number, email, address}).then(results=>{
                            setList(results.data)
                            resetValues();
                            getPcare();             
                    })
                            .catch(err=>console.log(err))}
                    }>

                    <div className='add-medication-container'>  
                        <h3>Primary Care Physician</h3> 
                        <div>
                            <input 
                            name='first_name'
                            placeholder='First Name'
                            value={first_name}
                            onChange={setValues}
                            />
                            <input 
                            name='last_name'
                            placeholder='Last Name'
                            value={last_name}
                            onChange={setValues}
                            />
                            <input 
                            name='phone_number'
                            placeholder='Phone Number'
                            value={phone_number}
                            onChange={setValues}
                            />
                            <input 
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={setValues}
                            />
                            <input 
                            name='address'
                            placeholder='Address'
                            value={address}
                            onChange={setValues}
                            />
                            <button type='submit'>Add New</button>
                        </div>
                    </div>
                    </form>
                    <div className='medication-container'>
                        <div className='meds-header'>
                            <p>Name</p>
                            <p>Phone Number</p>
                            <p>Email</p>
                            <p>Address</p>
                        </div>
                    {pcare_list.map((pcare, index)=>(
                        <div key={index} className='med-history'>
                            <p className='med-action'>{pcare.first_name} {pcare.last_name}<p>{toggle ? <actionbutton onClick={()=> {
                            setToggle(!toggle)
                            // editAllergy(allergy)
                            }}>Save</actionbutton>:<actionbutton onClick={()=>setToggle(!toggle)}>Edit</actionbutton>} 
                            <actionbutton
                            onClick={() => {
                                console.log(pcare)
                                deletePcare(pcare.provider_id)
                            }}
                            >Delete </actionbutton></p></p>
                            <p>{pcare.phone_number}</p>
                            <p>{pcare.email}</p>
                            <p>{pcare.address}</p>
                                    
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    function mapStateToProps (state) {
        return {user: state.userReducer.user}
    }
    
    export default connect(mapStateToProps, {getUser})(Pcare);