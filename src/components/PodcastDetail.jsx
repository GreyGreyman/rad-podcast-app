import React from 'react';
import { cors_api_url } from '../utils'
import { myFeedParser } from '../feed_parsers'
import { Episode } from './Episode';

export class PodcastDetail extends React.Component {

  static defaultProps = {
    podcast: {
      title: null,
      artist: null,
      description: null,
      episodes: [],
      feed: null
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.props.podcast.feed ? true : false,
      podcast: this.props.podcast,
    }
  }

  async componentDidMount() {
    console.log('PodcastDetail did mount');

    let feed = this.state.feed;

    if (!feed) {
      const response = await fetch(cors_api_url + `https://itunes.apple.com/lookup?id=${this.props.match.params.id}`)
        .then((res) => res.json());
      feed = response.results[0].feedUrl;
    }

    let xml = await fetch(cors_api_url + feed).then((res) => res.text());
    let podcast = myFeedParser(xml);

    if (this.state.subscribed) {
      this.props.onPodcastUpdate(this.props.match.params.id, { ...this.props.podcast, ...podcast });
    }
    else {
      this.setState({
        podcast: { ...podcast, feed, id: this.props.match.params.id }
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    // console.log(props.podcast);

    if (props.podcast.feed && props.podcast !== state)
      return {
        subscribed: true,
        podcast: props.podcast
      };
    return null;
  }

  componentDidUpdate() {
    console.log('PodcastDetail did update');
  }

  render() {
    let episodes = this.state.podcast.episodes.map((episode) => {
      return (
        <Episode
          title={episode.title}
          onClick={() => this.props.onEpisodeSelect(episode)}
        />);
    });
    return (
      <React.Fragment>
        <h1>{this.state.podcast.title}</h1>

        {this.state.subscribed ?
          (
            <p>subscribed</p>
          ) : (
            <button onClick={() => this.props.onSubscribe({ [this.state.podcast.id]: this.state.podcast })}>
              subscribe
            </button>
          )
        }

        <p>{this.state.podcast.description}</p>
        <ul className='episode-list'>
          {episodes}
        </ul>
      </React.Fragment>
    );
  }
}