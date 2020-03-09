import React, {useState, useEffect} from 'react';
import { useInputValue } from '../hooks/useInputValue';
import axios from 'axios';

const Surgeries = props => {
    const [{surgery_name, surgery_desc, surgery_date}, setValues, resetValues]=useInputValue({
        surgery_name: '',
        surgery_desc: '',
        surgery_date: ''
    })
    const [surgery_list, setList]=useState([])
    useEffect(()=>{
        console.log('hit')
        axios.get('/api/surgeries').then(results=>setList(results.data)).catch(err=>console.log(err))
    },[])
    const [toggle, setToggle]=useState(false);
        return(
            <main>
                Surgeries
                <div>
                    <form
                    onSubmit={e=>{
                        {axios.post('/api/addSurgery', {surgery_name, surgery_desc, surgery_date}).then(results=>{
                            setList(results.data)
                            resetValues()
                    })
                            .catch(err=>console.log(err))}}
                    }
                    >
                    <input 
                    name='surgery_name'
                    placeholder='Surgery Name'
                    value={surgery_name}
                    onChange={setValues}
                    />
                    <input 
                    name='surgery_desc'
                    placeholder='Surgery Description'
                    value={surgery_desc}
                    onChange={setValues}
                    />
                    <input 
                    name='surgery_date'
                    placeholder='Surgery Date'
                    value={surgery_date}
                    onChange={setValues}
                    />
                    <button type='submit'>Add New</button>
                    </form>
                    {surgery_list.map((surgery, index)=>(
                        <div key={index}>
                            <div>
                            {surgery.surgery_name}
                            {surgery.surgery_desc}
                            {surgery.surgery_date}
                            {toggle ? <button onClick={()=> {
                                setToggle(!toggle)
                                // editSurgery(surgery)
                                }}>Save</button>:<button onClick={()=>setToggle(!toggle)}>Edit</button>} 
                            <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        )
    }

    export default Surgeries; 