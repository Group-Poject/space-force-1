import React from 'react';

const Meds = props => {
    
        return(
            <main id='column'>

                <div className='add-medication-container'>
                    Medications
                    <div>
                        <input 
                        placeholder='Medication Name'
                        />
                        <input 
                        placeholder='Prescription Date'
                        />
                    </div>
                    <div>
                        <input 
                        placeholder='Dose'
                        />
                    </div>
                    <div>
                        <button>Add New</button>
                    </div>
                </div>
                <div className='medication-container'>

                </div>
            </main>
        )
    }

    export default Meds; 