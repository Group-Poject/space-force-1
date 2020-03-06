import React, {useState} from 'react';
import { useInputValue } from '../hooks/useInputValue';

const Allergies = props => {
    // const [inputs, setInputs]=useState({allergy_name: '', allergy_desc: '', diagnose_date: ''});
    const [{allergy_name, allergy_desc, diagnose_date}, setValues]=useInputValue({
        allergy_name: '',
        allergy_desc: '',
        diagnose_date: ''
    })
        return(
            <main>
                Allergies
                <div>
                    <input 
                    placeholder='Allergy Name'
                    value={allergy_name}
                    onChange={setValues}
                    />
                    <input 
                    placeholder='Allergy Description'
                    value={allergy_desc}
                    onChange={setValues}
                    />
                    <input 
                    placeholder='Diagnose Date'
                    value={diagnose_date}
                    onChange={setValues}
                    />
                    <button>Add New</button>
                </div>
            </main>
        )
    }

    export default Allergies; 