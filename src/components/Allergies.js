import React, {useState} from 'react';

const Allergies = props => {
    const [inputs, setInputs]=useState();
    
        return(
            <main>
                Allergies
                <div>
                    <input 
                    placeholder='Allergy Name'
                    // value={inputs.allergy_name}
                    />
                    <input 
                    placeholder='Allergy Description'
                    // value={inputs.allergy_desc}
                    />
                    <input 
                    placeholder='Diagnose Date'
                    // value={inputs.diagnose_date}
                    />
                    <button>Add New</button>
                </div>
            </main>
        )
    }

    export default Allergies; 