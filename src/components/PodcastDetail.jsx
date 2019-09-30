import React from 'react';
import { cors_api_url } from '../utils/utils'
import { myFeedParser } from '../utils/feed_parsers'
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
      const response =
        await fetch(cors_api_url + `https://itunes.apple.com/lookup?id=${this.props.match.params.id}`)
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
    const podcast = this.state.podcast;
    const episodes = podcast.episodes.map((episode) => {
      return (
        <Episode
          title={episode.title}
          onClick={() => this.props.onEpisodeSelect(episode)}
        />);
    });

    return (
      <React.Fragment>
        <div className='podcast-info'>
          <img className='podcast-info__image' src={podcast.image} alt={podcast.title + 'podcast logo'} />
          <div className='podcast-details'>

            <div className='podcast-details__title-container'>
              <h1 className='podcast-details__title'>{podcast.title}</h1>

              {this.state.subscribed ?
                (
                  <button className='podcast-details__subscribe-button'> subscribed </button>
                ) : (
                  <button
                    className='podcast-details__subscribe-button'
                    onClick={() => this.props.onSubscribe({ [podcast.id]: podcast })}
                  >
                    subscribe
                  </button>
                )
              }
            </div>

            <p>{podcast.description}</p>
          </div>
        </div>

        <ul className='episode-list'>
          {episodes}
        </ul>
      </React.Fragment>
    );
  }
}