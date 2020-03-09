import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';

const Meds = props => {
    const [{medication_name, prescription_date, dose}, setValues, resetValues]=useInputValue({
        medication_name: '',
        prescription_date: '',
        dose: ''
    })
    const [medicine_list, setList]=useState([])
    useEffect(()=>{
        console.log('hit')
        axios.get('/api/medicines').then(results=>setList(results.data)).catch(err=>console.log(err))
    },[])
    const [toggle, setToggle]=useState(false);
        return(
            <main id='column'>
                <form
                onSubmit={e=>{
                    {axios.post('/api/addMedicine', {medication_name, prescription_date, dose}).then(results=>{
                        setList(results.data)
                        resetValues()
                })
                        .catch(err=>console.log(err))}}
                }>
                <div className='add-medication-container'>
                    Medications
                    <div>
                        <input 
                        name='medication_name'
                        placeholder='Medication Name'
                        value={medication_name}
                        onChange={setValues}
                        />
                        <input 
                        name='prescription_date'
                        placeholder='Prescription Date'
                        value={prescription_date}
                        onChange={setValues}
                        />
                    </div>
                    <div>
                        <input 
                        name='dose'
                        placeholder='Dose'
                        value={dose}
                        onChange={setValues}
                        />
                    </div>
                    <div>
                        <button type='submit'>Add New</button>
                    </div>
                </div>
                <div className='medication-container'>

                </div>
                </form>
                {medicine_list.map((medicine, index)=>(
                        <div key={index}>
                            <div>
                            {medicine.medication_name}
                            {medicine.prescription_date}
                            {medicine.dose}
                            {toggle ? <button onClick={()=> {
                                setToggle(!toggle)
                                // editMedicine(medicine)
                                }}>Save</button>:<button onClick={()=>setToggle(!toggle)}>Edit</button>} 
                            <button>Delete</button>
                            </div>
                        </div>
                    ))}
            </main>
        )
    }

    export default Meds; 