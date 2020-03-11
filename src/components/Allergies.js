import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Allergies = props => {
    const [{allergy_name, allergy_desc, diagnose_date}, setValues, resetValues]=useInputValue({
        allergy_name: '',
        allergy_desc: '',
        diagnose_date: ''
    },[])
    const [allergy_list, setList]=useState([])
    useEffect(()=>{
        console.log('hit')
        axios.get(`/api/allergies${props.user.patient_id}`).then(results=>setList(results.data)).catch(err=>console.log(err))
    })
    // const deleteAllergy =(id)=>{
    //     console.log(id)
    //     axios.delete (`/api/allergy/${id}`)
    //     .then(results=> {
    //       this.getAllergies()
    //       this.setList({allergies: results.data})
    //     }).catch(err=>console.log(err))
    // }
    const [toggle, setToggle]=useState(false);
        return(
            <main id='meds-main'>
                <form 
                    onSubmit={e=>{
                        e.preventDefault()
                        axios.post(`/api/addAllergy${props.user.patient_id}`, {allergy_name, allergy_desc, diagnose_date}).then(results=>{
                            setList(results.data)
                            resetValues()              
                    })
                            .catch(err=>console.log(err))}
                    }>

                    <div className='add-medication-container'>  
                        <h3>Allergies</h3> 
                        <div>
                            <input 
                            name='allergy_name'
                            placeholder='Allergy Name'
                            value={allergy_name}
                            onChange={setValues}
                            />
                            <input 
                            name='allergy_desc'
                            placeholder='Allergy Description'
                            value={allergy_desc}
                            onChange={setValues}
                            />
                            <input 
                            name='diagnose_date'
                            placeholder='Diagnose Date'
                            value={diagnose_date}
                            onChange={setValues}
                            />
                            <button type='submit'>Add New</button>
                        </div>
                    </div>
                    </form>
                    <div className='medication-container'>
                        <div className='meds-header'>
                            <p>Allergy</p>
                            <p>Diagnose Date</p>
                            <p>Description</p>
                        </div>
                    {allergy_list.map((allergy, index)=>(
                        <div key={index} className='med-history'>
                            <div>
                                <p className='med-action'>{allergy.allergy_name}<p>{toggle ? <actionbutton onClick={()=> {
                                setToggle(!toggle)
                                // editAllergy(allergy)
                                }}>Save</actionbutton>:<actionbutton onClick={()=>setToggle(!toggle)}>Edit</actionbutton>} 
                                <actionbutton
                                // onClick={() => deleteAllergy(allergy)}
                                >Delete </actionbutton></p></p>
                                <p>{allergy.allergy_desc}</p>
                                <p>{allergy.diagnose_date}</p>
                                    
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    const mapStateToProps = state => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser})(Allergies);