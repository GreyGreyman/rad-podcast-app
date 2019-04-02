import React from 'react';
import { cors_api_url } from '../utils'

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

export class EpisodeList extends React.Component {
    componentDidMount = async () => {
        console.log('Episode list did mount');

        let xml = await fetch(cors_api_url + this.props.podcast.feed).then((res) => res.text());
        let domParser = new DOMParser();
        let doc = domParser.parseFromString(xml, 'text/xml');
        let items = doc.querySelectorAll('item');
        let episodes = [];
        items.forEach((episode) => {
            episodes.push({
                title: episode.querySelector('title').textContent,
                link: episode.querySelector('enclosure').getAttribute('url')
            })
        });
        episodes = episodes.slice(0, 5);
        this.props.onUpdate(this.props.selectedPodcast, { ...this.props.podcast, episodes });
    }
    componentDidUpdate() {
        console.log('Episode list did update');
    }
    render() {
        let episodeList = this.props.podcast.episodes.map((episode, index) => {
            return ( 
                <Episode 
                    title={episode.title} 
                    onClick={() => this.props.onSelect(this.props.selectedPodcast, index)}
                />);
        });
        return (
            <React.Fragment>
                <ul className='episode-list'>
                    {episodeList}
                </ul>
            </React.Fragment>
            
        );
    }
}