'use strict';

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import HTMLTemplate from './html';
import serialze from 'serialize-javascript';

export default function render(view, appState) {
    return renderToStaticMarkup(
        React.createElement(HTMLTemplate, {
            title: 'Releases',
            markup: renderToString(React.createElement(view, appState)),
            appState: `window.appState = ${serialze(appState)};`
        })
    )
}
