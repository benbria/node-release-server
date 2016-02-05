'use strict';
import React          from 'react';
import Release        from './Release';

/*
 * `rows` is an array of `{date, tagsByProject}` objects, where `date` is a string and `tagsByProject` is a hash
 * where keys are project names and values are arrays of `{tag, sha, date, message}` objects.
 */
export default ({rows}) =>
    <div>{
        rows.map((row, index) =>
            <Release key={row.date} initiallyHidden={index !== 0} {...row}/>
        )
    }</div>
