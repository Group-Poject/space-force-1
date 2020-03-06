import React from 'react';

const Allergies = props => {
    
        return(
            <main>
                Allergies
                <div>
                    <input 
                    placeholder='Allergy Name'
                    />
                    <input 
                    placeholder='Allergy Description'
                    />
                    <input 
                    placeholder='Diagnose Date'
                    />
                    <button>Add New</button>
                </div>
            </main>
        )
    }

    export default Allergies; 