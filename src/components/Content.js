import React from 'react';

class Episode extends React.Component {
    render() {
        return (
            <li className='episode-list__item'>
                <button className='episode-list-item__play' onClick={this.props.onClick}>
                    Play
                </button>
                <p>{this.props.title}</p>
            </li>
        )
    }
}

export class Content extends React.Component {
    render() {
        let episodeList = this.props.episodes.map((episode, index) => {
            return ( 
                <Episode 
                    title={episode.title} 
                    onClick={() => this.props.onSelect(index)}
                />);
        });
        return (
            <ul className='episode-list'>
                {episodeList}
            </ul>
        );
    }
}