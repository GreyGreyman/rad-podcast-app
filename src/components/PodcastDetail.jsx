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

export class PodcastDetail extends React.Component {
    componentDidMount = async () => {
        console.log('PodcastDetail did mount');

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

        episodes = episodes.slice(0, 15);
        this.props.onPodcastUpdate(this.props.podcastKey, { ...this.props.podcast, episodes });
    }
    componentDidUpdate() {
        console.log('PodcastDetail did update');
    }
    render() {
        let episodes = this.props.podcast.episodes.map((episode, index) => {
            return (
                <Episode
                    title={episode.title}
                    onClick={() => this.props.onEpisodeSelect(this.props.podcastKey, index)}
                />);
        });
        return (
            <React.Fragment>
                <h1>{this.props.podcast.title}</h1>
                <p>{this.props.podcast.description}</p>
                <ul className='episode-list'>
                    {episodes}
                </ul>
            </React.Fragment>

        );
    }
}