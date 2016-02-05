"use strict";

import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import moment from 'moment';
import _ from 'lodash';
import View from '../client/components/index'

import Github from './github'
import render from './render';

const ASSETS_PATH = path.resolve(__dirname + '/../../dist');
const CONFIG_FILE_PATH = path.resolve(__dirname, '../../config.json');
const CONFIG = fs.existsSync(CONFIG_FILE_PATH)
    ? JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, {encoding: "utf-8"}))
    : {
        "gh_username": process.env.GH_USERNAME,
        "gh_token": process.env.GH_TOKEN,
        "projects": process.env.PROJECTS.split(',')
    };
const github = new Github({username: CONFIG.gh_username, token: CONFIG.gh_token});

const app = express();

// Serve JS and CSS files
app.use('/assets', express.static(ASSETS_PATH));


app.get('/', (req, res) => {
    Promise.all(CONFIG.projects.map(project =>
        github.getTags(project)
        .then(tags =>
            ({project, tags})
        )
    )).then(results => {

        /* `results` is an array of `{project, tags}` objects.  Need to transform this into an array where
         * we have one entry for each unique date, and then a list of tags for each project for that date.
         */
        let indexedByDate = {}
        results.forEach(result =>
            result.tags.forEach(tag => {
                let date = tag.date.format('YYYY-MM-DD');
                indexedByDate[date] = indexedByDate[date] || {
                    date,
                    sortDate: moment(`${date} 00:00:00Z`).valueOf(),
                    tagsByProject: _(CONFIG.projects).keyBy().mapValues(() => []).value()
                }
                indexedByDate[date].tagsByProject[result.project].push(tag);
            })
        )
        let rows = _(indexedByDate).values().sortBy('sortDate').value();

        // Find the row that has an entry for the first project.  Discard all rows before this.
        let firstGoodRow = _.findIndex(rows, row => row.tagsByProject[CONFIG.projects[0]].length > 0);
        rows = rows.slice(firstGoodRow).reverse();

        res.send(render(View, {projects: CONFIG.projects, rows}));

    })
    .catch(err =>
        res.status(500).send(err.stack)
    );

})

const PORT = CONFIG.port || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
