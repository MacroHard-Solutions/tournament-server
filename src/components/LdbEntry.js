import React from 'react';
import '../styles/Entry.css'

function LdbEntry({item}){

    return(
        <div className='entry'>
            <h4>{item.username}</h4>
            <h4>{item.agentELO}</h4>
        </div>
    );

}

export default LdbEntry;