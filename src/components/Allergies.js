import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';

const Allergies = props => {
    // const [inputs, setInputs]=useState({allergy_name: '', allergy_desc: '', diagnose_date: ''});
    const [{allergy_name, allergy_desc, diagnose_date}, setValues, resetValues]=useInputValue({
        allergy_name: '',
        allergy_desc: '',
        diagnose_date: ''
    })
    const [allergy_list, setList]=useState([])
    useEffect(()=>{
        console.log('hit')
        axios.get('/api/allergies').then(results=>setList(results.data)).catch(err=>console.log(err))
    },[])
        return(
            <main>
                Allergies
                <div>
                    <form 
                    onSubmit={e=>{
                        // e.preventDefault()
                        {axios.post('/api/addAllergy', {allergy_name, allergy_desc, diagnose_date}).then(results=>{
                            setList(results.data)
                            resetValues()
                            // setValues({target:{name: 'allergy_name', value: ''}})
                            // setValues({target:{name: 'allergy_desc', value: ''}})
                            // setValues({target:{name: 'diagnose_date', value: ''}})
                            
                    })
                            .catch(err=>console.log(err))}}
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

                            <h1>{allergy.allergy_name}</h1>
                            <h1>{allergy.allergy_desc}</h1>
                            <h1>{allergy.diagnose_date}</h1>
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    export default Allergies; 