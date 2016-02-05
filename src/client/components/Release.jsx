'use strict';
import React          from 'react';

const ShowHideBlock = ({hidden}) =>
    <div style={{marginRight: '10px', display: 'inline-block'}}>
        <div style={{
            border: '1px solid black',
            color: 'black',
            fontSize:'200%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {hidden ? '+' : '-'}
        </div>
    </div>


/*
 * Expected props are `{date, tagsByProject, initiallyHidden}`, where `date` is a string and `tagsByProject` is a hash
 * where keys are project names and values are arrays of `{tag, sha, date, message}` objects.
 */
const Release = React.createClass({
    getDefaultProps: function() {
        return {initiallyHidden: true};
    },

    getInitialState: function() {
        return {hidden: this.props.initiallyHidden};
    },

    showHide: function() {
        this.setState({hidden: !this.state.hidden});
    },

    render: function() {
        let tagsByProject = this.props.tagsByProject;

        return (
            <div style={{borderBottom: '1px solid black'}}>
                <div onClick={this.showHide} style={{color: '#00d'}}>
                    <ShowHideBlock hidden={this.state.hidden}/><h2 style={{display: 'inline-block'}}>{this.props.date}</h2>
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
