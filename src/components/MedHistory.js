import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const MedHistory = props => {
    const [{condition, cond_desc, date}, setValues, resetValues]=useInputValue({
        condition: '',
        cond_desc: '',
        date: ''
    })
    const [personal_history_list, setPersonalList]=useState([])
    useEffect(()=>{
        console.log('hit')
        axios.get(`/api/personal-history${props.user.patient_id}`).then(results=>setPersonalList(results.data)).catch(err=>console.log(err))
    })
    const [family_history_list, setFamilyList]=useState([])
    useEffect(()=>{
        console.log('hit')
        axios.get(`/api/family-history${props.user.patient_id}`).then(results=>setFamilyList(results.data)).catch(err=>console.log(err))
    })
    const [toggle, setToggle]=useState(false);
    
        return(
            <main id='medical-history-main'>
                {toggle
                ?
                <div>
                    <p onClick={() => {setToggle(!toggle)}}>Personal Medical History</p>

                    <form></form>

                    {personal_history_list.map((e, i) => (
                        <div key={i}>
                            <p>{e.condition}</p>
                            <p>{e.cond_desc}</p>
                            <p>{e.date}</p>
                        </div>
                    ))}
                </div>
                :
                <div>
                    <p onClick={() => {setToggle(!toggle)}}>Family Medical History</p>
                    
                    <form></form>

                    {family_history_list.map((e, i) => (
                        <div key={i}>
                            <p>{e.patient_relationship}</p>
                            <p>{e.condition}</p>
                            <p>{e.condition_desc}</p>
                        </div>
                    ))}
                </div>
                }
            </main>
        )
    }

    const mapStateToProps = state => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser})(MedHistory);