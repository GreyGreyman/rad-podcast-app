import React from 'react';


export class Player extends React.Component {
    componentDidMount() {
        console.log('Player mounted');
        this.audio = document.querySelector('audio');
    }
    componentDidUpdate() {
        console.log('Player updated');
        if(this.props.link)
            this.audio.play();
    }
    shouldComponentUpdate(nextProps) {
        const differentTitle = this.props.title !== nextProps.title;
        const differentLink = this.props.link !== nextProps.link
        return differentTitle || differentLink;
    }
    render() {
        return (
            <div className='player'>
                <p className='player__episode-name'>Now playing: {this.props.title}</p>
                {/* <p className='player__podcast-name'>Now playing: {this.props.title}</p> */}
                <audio src={this.props.link} controls>
                </audio>
            </div>
        );
    }
}

Player.defaultProps = {
    title: 'nothing!',
    link: ''
}