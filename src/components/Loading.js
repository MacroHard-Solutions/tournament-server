import '../styles/Loading.css';
import React from 'react';

function Loading({ caption }) {
    return (
        <div className='prompt'>
            <div classname='ring'>
                <div class="centered">
                    <div class="blob-1"></div>
                    <div class="blob-2"></div>
                </div>
                <br />
                <span className='caption'>{caption}</span>
            </div>
        </div>
    )
}

export default Loading;