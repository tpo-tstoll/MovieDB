import React, { useContext} from 'react';
import Context from '../context';

const ValidationError = () => {
    const { value: { validationError } } = useContext(Context);

    //returns validation error component
    return (
        <div className="validation--errors">
            <h3><span>Validation Errors</span></h3>
            <ul>
                {validationError.map(error => {
                    //find a better key?!?!
                    return <li key={error}><span>{error}</span></li>
                })}
            </ul>
        </div>
    );
}

export default ValidationError;