import React from 'react'
import ReactDOM from 'react-dom';

import { Test } from './components/Test';
import { WS } from './hierarhy/01-WS/Websocket';

const TARGET_ID = 'target';

function App() {
    return (
        <div id="ttt">
            <WS />
            <Test />
        </div>
    )
}

function attach_react() {
    const target = document.createElement('div');
    target.id = TARGET_ID;
    document.body.appendChild(target);
    ReactDOM.render(<App />, target);
}

attach_react()