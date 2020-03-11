import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Meds = props => {
    const [{medication_name, prescription_date, dose}, setValues, resetValues]=useInputValue({
        medication_name: '',
        prescription_date: '',
        dose: ''
    })
    const [medicine_list, setList]=useState([])
    const getMedicines = () => axios.get(`/api/medicines${props.user.patient_id}`).then(results=>setList(results.data)).catch(err=>console.log(err))
    useEffect((e)=>{
        // console.log('hit')
        getMedicines();
    }, [])
    const deleteMedicine =(id)=>{
        console.log(id)
        axios.delete (`/api/medicine/${id}`)
        .then(results=> {
          getMedicines()
        }).catch(err=>console.log(err))
    }
    const [toggle, setToggle]=useState(false);
        return(
            <main id='meds-main'>
                <form
                onSubmit={e=>{
                    e.preventDefault()
                    axios.post(`/api/medicine${props.user.patient_id}`, {medication_name, prescription_date, dose}).then(results=>{
                        setList(results.data)
                        resetValues()
                        getMedicines()
                })
                        .catch(err=>console.log(err))}
                }>
                <div className='add-medication-container'>
                    <h3>Medications</h3>
                    <div>
                        <input 
                        name='medication_name'
                        placeholder='Medication Name'
                        value={medication_name}
                        onChange={setValues}
                        />
                        <input 
                        name='prescription_date'
                        type='date'
                        placeholder='Prescription Date'
                        value={prescription_date}
                        onChange={setValues}
                        />
                        <input 
                        name='dose'
                        placeholder='Dose'
                        value={dose}
                        onChange={setValues}
                        />
                        <button type='submit'>Add New</button>
                    </div>
                </div>
                </form>
                <div className='medication-container'>
                    <div className='meds-header'>
                        <p>Medication</p>
                        <p>Prescription Date</p>
                        <p>Dose</p>
                    </div>
                {medicine_list.map((medicine, index)=>(
                        <div key={index} className='med-history'>
                            <p className='med-action'>{medicine.medication_name}<p>{toggle ? <actionbutton onClick={()=> {
                                setToggle(!toggle)
                                // editMedicine(medicine)
                                }}>Save</actionbutton>:<actionbutton onClick={()=>setToggle(!toggle)}>Edit</actionbutton>} 
                            <actionbutton
                            onClick={() => {
                                console.log(medicine)
                                deleteMedicine(medicine.medication_id)
                            }}>Delete</actionbutton></p></p>
                            <p>{medicine.prescription_date}</p>
                            <p>{medicine.dose}</p>
                            
                        </div>
                    ))}
                    </div>
            </main>
        )
    }

    const mapStateToProps = state => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser})(Meds);