import React from "react";

const Edit = props => {

    const displayInputs = props => {
        console.log(props.inputs)
        let inputs = []
        props.inputs.forEach((e,i)=>{
            inputs.push(<input key={i} />)
        })
        return inputs
    }
  return (
    <div>
        {displayInputs}
        <button>Submit</button>
    </div>
  );
};

export default Edit;
