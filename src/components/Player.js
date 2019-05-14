import React from 'react';


export class Player extends React.PureComponent {
  static defaultProps = {
    title: 'nothing!',
    link: ''
  }

  componentDidMount() {
    console.log('Player mounted');
    this.audio = document.querySelector('audio');
  }
  componentDidUpdate() {
    console.log('Player updated');
    if (this.props.link)
      this.audio.play();
  }
  render() {
    return (
      <div className='player'>
        <p className='player__episode-name'>Now playing: {this.props.title}</p>
        <audio src={this.props.link} controls>
        </audio>
      </div>
    );
  }
}