import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Surgeries = props => {
    const [{surgery_name, surgery_desc, surgery_date}, setValues, resetValues]=useInputValue({
        surgery_name: '',
        surgery_desc: '',
        surgery_date: ''
    },[])
    const [surgery_list, setList]=useState([])
    const getSurgeries = () => axios.get(`/api/surgeries${props.userReducer.user.patient_id}`).then(results=>setList(results.data)).catch(err=>console.log(err))
    useEffect((e)=>{
        // console.log('hit')
        getSurgeries();
    }, [])
    const deleteSurgery =(id)=>{
        console.log(id)
        axios.delete (`/api/surgery/${id}`)
        .then(results=> {
          getSurgeries()
        }).catch(err=>console.log(err))
    }
    const [toggle, setToggle]=useState(false);
        return(
            <main id='meds-main'>
                <form
                onSubmit={e=>{
                    e.preventDefault()
                    axios.post(`/api/surgery${props.userReducer.user.patient_id}`, {surgery_name, surgery_desc, surgery_date}).then(results=>{
                        setList(results.data)
                        resetValues()
                        getSurgeries()
                })
                        .catch(err=>console.log(err))}
                }
                >
                    <div className='add-medication-container'>
                        <h3>Surgeries</h3>
                        <div>
                            <input 
                            name = 'surgery_name'
                            placeholder = 'Surgery Name'
                            value = {surgery_name}
                            onChange = {setValues}
                            />
                            <input 
                            name='surgery_desc'
                            placeholder = 'Surgery Description'
                            value = {surgery_desc}
                            onChange = {setValues}
                            />
                            <input 
                            name = 'surgery_date'
                            placeholder = 'Surgery Date'
                            value = {surgery_date}
                            onChange = {setValues}
                            />
                            <button type = 'submit'>Add New</button>
                        </div>
                    </div>
                    </form>
                    <div className='medication-container'>
                        <div className='meds-header'>
                            <p>Medication</p>
                            <p>Prescription Date</p>
                            <p>Dose</p>
                        </div>
                    {surgery_list.map((surgery, index)=>(
                        <div key={index} className='med-history'>
                            <p className='med-action'>{surgery.surgery_name}<p>{toggle ? <actionbutton onClick={()=> {
                                setToggle(!toggle)
                                // editSurgery(surgery)
                                }}>Save</actionbutton>:<actionbutton onClick={()=>setToggle(!toggle)}>Edit</actionbutton>} 
                            <actionbutton
                            onClick={() => {
                                console.log(surgery)
                                deleteSurgery(surgery.surgery_id)
                            }}>Delete</actionbutton></p></p>
                            <p>{surgery.surgery_desc}</p>
                            <p>{surgery.surgery_date}</p>
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    const mapStateToProps = state => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser})(Surgeries);