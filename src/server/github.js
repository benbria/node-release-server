import fetch from 'isomorphic-fetch';
import moment from 'moment';
import LRU    from 'lru-cache';

export default class Github {
    constructor(credentials) {
        this.cache = LRU({
            max: 1000
        });
        this.headers = {
            'Authorization': "Basic " + new Buffer(credentials.username + ":" + credentials.token).toString('base64')
        };
    }

    _github(url) {
        return fetch(url, {headers: this.headers})
        .then((response) => {
            if(response.status < 200 || response.status >= 300) {
                throw new Error(`Server returned ${response.status}`);
            }
            return response.json();
        });
    }

    /**
     * @param {string} project - github project to get (e.g. 'benbria/promise-breaker').
     * @returns {Promise} - Resolve to array of `{tag, sha, date, message}` objects.
     */
    getTags(project) {
        return this._github(`https://api.github.com/repos/${project}/tags`)
        .then(tags =>
            Promise.all(tags.map(tag =>
                // TODO: Cache commits
                Promise.resolve(this.cache.get(tag.commit.sha))
                .then(cached =>
                    cached ? cached :
                    this._github(`https://api.github.com/repos/${project}/git/commits/${tag.commit.sha}`)
                    .then(commit => {
                        this.cache.set(tag.commit.sha, commit);
                        return commit;
                    })
                ).then(commit =>
                    ({
                        tag: tag.name,
                        sha: tag.commit.sha,
                        date: moment(commit.committer.date),
                        message: commit.message
                    })
                )
            ))
        );
    }


}
