'use strict';
import React          from 'react';

/*
 * Expected props are `{date, tagsByProject}`, where `date` is a string and `tagsByProject` is a hash
 * where keys are project names and values are arrays of `{tag, sha, date, message}` objects.
 */
const Release = React.createClass({
    getInitialState: function() {
        return {hidden: false};
    },

    showHide: function() {
        this.setState({hidden: !this.state.hidden});
    },

    render: function() {
        let tagsByProject = this.props.tagsByProject;

        return (
            <div style={{borderBottom: '1px solid black'}}>
                <div onClick={this.showHide}>
                    <div style={{color: '#00d'}}>
                        <h2>{this.props.date}</h2>
                        <ul>
                        {
                            Object.keys(tagsByProject).map(project =>
                                tagsByProject[project].length > 0 ? (<li key={project}>
                                    {project}: {tagsByProject[project].map(tag => tag.tag).join(', ')}
                                </li>) : null
                            )
                        }
                        </ul>
                    </div>
                </div>
                {
                    this.state.hidden ? null : <div>{
                        Object.keys(tagsByProject).map(project =>
                            <div key={project}>
                                <h3>{project}</h3>
                                {
                                    tagsByProject[project].map(tag =>
                                        <div key={tag.tag}>
                                            <h4>{tag.tag}</h4>
                                            <pre>
                                                {tag.message}
                                            </pre>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }</div>
                }
            </div>
        )
    }
})

export default Release;
