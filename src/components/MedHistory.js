import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const MedHistory = props => {
    const [{condition, cond_desc, date}, setPersonalValues, resetValues]=useInputValue({
        condition: '',
        cond_desc: '',
        date: ''
    })
    const [{patient_relationship, famCondition, condition_desc}, setFamValues, resetFamValues]=useInputValue({
        patient_relationship: '',
        famCondition: '',
        condition_desc: ''
    })
    const [personal_history_list, setPersonalList]=useState([])
    const [family_history_list, setFamilyList]=useState([])

    const getPersonalHistory = () => axios.get(`/api/personal-history${props.user.patient_id}`)
    .then(results => setPersonalList(results.data))
    .catch(err => console.log(err))
    useEffect(() => {
        getPersonalHistory();
        getFamHistory();
    }, [])

    const getFamHistory = () => axios.get(`/api/fam-history${props.user.patient_id}`)
    .then(results => setFamilyList(results.data))
    .catch(err => console.log(err))
    useEffect(() => {
        getFamHistory();
        getPersonalHistory();
    }, [])

    const deletePersonalHistory =(id)=>{
        console.log(id)
        axios.delete (`/api/medicine/${id}`)
        .then(results=> {
          getPersonalHistory()
        }).catch(err=>console.log(err))
    }

    const deleteFamHistory =(id)=>{
        console.log(id)
        axios.delete (`/api/medicine/${id}`)
        .then(results=> {
          getFamHistory()
        }).catch(err=>console.log(err))
    }

    const [toggle, setToggle]=useState(false);
    
        return(
            <main id='medical-history-main'>
                {toggle
                ?
                <div>
                    <p onClick={() => {setToggle(!toggle)}}>Personal Medical History</p>

                    <form 
                    onSubmit={e=>{
                        e.preventDefault()
                        axios.post(`/api/add-personal-history${props.user.patient_id}`, {condition, cond_desc, date})
                        .then(results=>{
                            setPersonalList(results.data)
                            resetValues()              
                    })
                            .catch(err=>console.log(err))}
                    }>

                    <input 
                    name='condition'
                    placeholder='Condition'
                    value={condition}
                    onChange={setPersonalValues}
                    />
                    <input 
                    name='cond_desc'
                    placeholder='Condition description'
                    value={cond_desc}
                    onChange={setPersonalValues}
                    />
                    <input 
                    name='date'
                    placeholder='Date'
                    value={date}
                    onChange={setPersonalValues}
                    />
                    <button type='submit'>Add</button>
                    </form>

                    {personal_history_list.map((e, i) => (
                        <div key={i}>
                            <p>{e.condition}</p>
                            <p>{e.cond_desc}</p>
                            <p>{e.date}</p>
                            <button onClick={() => deletePersonalHistory(e.med_history_id)}>Remove</button>
                        </div>
                    ))}
                </div>
                :
                <div>
                    <p onClick={() => {setToggle(!toggle)}}>Family Medical History</p>
                    
                    <form 
                    onSubmit={e=>{
                        e.preventDefault()
                        axios.post(`/api/add-fam-history${props.user.patient_id}`, {patient_relationship, famCondition, condition_desc})
                        .then(results=>{
                            setPersonalList(results.data)
                            resetFamValues()              
                    })
                            .catch(err=>console.log(err))}
                    }>

                    <input 
                    name='patient_relationship'
                    placeholder='Relationship to patient'
                    value={patient_relationship}
                    onChange={setFamValues}
                    />
                    <input 
                    name='famCondition'
                    placeholder='Condition'
                    value={famCondition}
                    onChange={setFamValues}
                    />
                    <input 
                    name='condition_desc'
                    placeholder='Condition description'
                    value={condition_desc}
                    onChange={setFamValues}
                    />
                    <button type='submit'>Add</button>
                    </form>

                    {family_history_list.map((e, i) => (
                        <div key={i}>
                            <p>{e.patient_relationship}</p>
                            <p>{e.condition}</p>
                            <p>{e.condition_desc}</p>
                            <button onClick={() => deleteFamHistory(e.fam_med_id)}>Remove</button>
                        </div>
                    ))}
                </div>
                }
            </main>
        )
    }

    function mapStateToProps (state) {
        return {user: state.userReducer.user}
    }
    
    export default connect(mapStateToProps, {getUser})(MedHistory);