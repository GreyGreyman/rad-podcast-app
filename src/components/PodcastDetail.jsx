import React from 'react';
import { cors_api_url } from '../utils'
import { myFeedParser } from '../feed_parsers'


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
  async componentDidMount() {
    console.log('PodcastDetail did mount');

    let feed = this.props.podcast.feed;

    if (!feed) {
      const response = await fetch(cors_api_url + `https://itunes.apple.com/lookup?id=${this.props.match.params.id}`)
        .then((res) => res.json());
      feed = response.results[0].feedUrl;
    }

    let xml = await fetch(cors_api_url + feed).then((res) => res.text());
    let podcast = myFeedParser(xml);

    this.props.onPodcastUpdate(this.props.match.params.id, { ...this.props.podcast, ...podcast });
  }

  componentDidUpdate() {
    console.log('PodcastDetail did update');
  }

  render() {
    let episodes = this.props.podcast.episodes.map((episode, index) => {
      return (
        <Episode
          title={episode.title}
          onClick={() => this.props.onEpisodeSelect(this.props.match.params.id, index)}
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

PodcastDetail.defaultProps = {
  podcast: {
    title: null,
    artist: null,
    description: null,
    episodes: [],
    feed: null
  }
}