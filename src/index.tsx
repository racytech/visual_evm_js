import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Layout } from './components/Layout';
import { Spinner } from './components/Spinner';
import { State } from './components/State/State';


const TARGET_ID = 'target';


function Main() {
    return (
        <State>
            <Layout />
            <Spinner />
        </State>
    )
}


function attach_react() {
    const target = document.createElement('div');
    target.id = TARGET_ID;
    document.body.appendChild(target);
    ReactDOM.render(<Main />, target);
}

window.addEventListener('DOMContentLoaded', (e) => {
    attach_react();
})

