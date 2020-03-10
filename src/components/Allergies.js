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
    })
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
            <main>
                Allergies
                <div>
                    <form 
                    onSubmit={e=>{
                        // e.preventDefault()
                        axios.post(`/api/addAllergy${props.user.patient_id}`, {allergy_name, allergy_desc, diagnose_date}).then(results=>{
                            setList(results.data)
                            resetValues()              
                    })
                            .catch(err=>console.log(err))}
                    }>

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
                    </form>
                    {allergy_list.map((allergy, index)=>(
                        <div key={index}>
                            <div>
                                {allergy.allergy_name}
                                {allergy.allergy_desc}
                                {allergy.diagnose_date}
                                {toggle ? <button onClick={()=> {
                                setToggle(!toggle)
                                // editAllergy(allergy)
                                }}>Save</button>:<button onClick={()=>setToggle(!toggle)}>Edit</button>} 
                                <button
                                // onClick={() => deleteAllergy(allergy)}
                                >Delete </button>    
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