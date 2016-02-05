'use strict';
import React          from 'react';

/**
 * Stateless React component to handle the rendering of the top level HTML page.
 *
 * @constructor
 * @param {string} props - A `{title, markup, appState}` object.
 */
const Html = function (props) {
    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <meta name="viewport" content="width=device-width, user-scalable=no" />
        </head>
        <body>
            {props.markup
                ? <div id="app" dangerouslySetInnerHTML={{__html: props.markup}}/>
                : <div id="app">{props.children}</div>
            }
            <script dangerouslySetInnerHTML={{__html: props.appState || ''}}></script>
            <script src="/assets/index.js" defer/>
        </body>
        </html>
    );
};

Html.propTypes = {
    title: React.PropTypes.string,
    markup: React.PropTypes.string,
    appState: React.PropTypes.string
};

export default Html;
