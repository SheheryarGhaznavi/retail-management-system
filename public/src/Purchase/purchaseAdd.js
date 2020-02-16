import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Add from './Add'

function run() {
    ReactDOM.render(
        <Add/>,
        document.getElementById('Add')
    );

// renderDom here

}// run end


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

