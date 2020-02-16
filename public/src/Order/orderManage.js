import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Manage from './Manage'

function run() {
    ReactDOM.render(
        <Manage/>,
        document.getElementById('Manage')
    );

// renderDom here

}// run end


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}

