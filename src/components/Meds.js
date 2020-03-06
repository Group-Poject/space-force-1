import React from 'react';

const Meds = props => {
    
        return(
            <main>
                Medications
                <div>
                    <input 
                    placeholder='Medication Name'
                    />
                    <input 
                    placeholder='Prescription Date'
                    />
                    <input 
                    placeholder='Dose'
                    />
                    <button>Add New</button>
                </div>
            </main>
        )
    }

    export default Meds; 