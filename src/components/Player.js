import React from 'react';

export class Player extends React.Component {
    render() {
        return (
            <div className='player'>
                <p>Now playing {this.props.title}</p>
                <audio src={this.props.link} controls>
                </audio>
            </div>
        );
    }
}