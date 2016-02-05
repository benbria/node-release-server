"use strict";
'use strict';

import React                          from 'react';
import ReactDOM                       from 'react-dom';
import View                           from './components/index'

const initialState = window.appState;

ReactDOM.render(
    React.createElement(View, initialState),
    document.getElementById('app')
);
