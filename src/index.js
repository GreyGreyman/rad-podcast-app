import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PodcastList } from './components/PodcastList'
import { EpisodeList } from './components/EpisodeList';
import { Player } from './components/Player';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const podcasts_stub = [
    {
        title: 'syntax',
        feed: 'http://feed.syntax.fm/rss',
        episodes: []
    },
    {
        title: 'dad and sons',
        feed: 'http://feeds.soundcloud.com/users/soundcloud:users:365723144/sounds.rss',
        episodes: []
    },
]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: podcasts_stub,
            selectedEpisode: null,
            selectedPodcast: null,
            playingEpisode: {
                podcast: null,
                episode: null
            }
        }
        this.handleEpisodeSelect = this.handleEpisodeSelect.bind(this);
        this.handlePodcastSelect = this.handlePodcastSelect.bind(this);
        this.handlePodcastUpdate = this.handlePodcastUpdate.bind(this);
    }

    handleEpisodeSelect(podcast, episode) {
        this.setState({
            playingEpisode: {
                podcast,
                episode
            }
        });
    }

    handlePodcastSelect(i) {
        this.setState({ selectedPodcast: i })
    }

    handlePodcastUpdate(key, podcast) {
        let podcasts = [...this.state.podcasts];
        podcasts[key] = podcast;
        this.setState({ podcasts });
    }

    render() {
        let selectedPodcast = this.state.podcasts[this.state.selectedPodcast];
        let playingPodcast = this.state.podcasts[this.state.playingEpisode.podcast];
        let playingEpisode = playingPodcast !== undefined ?
            playingPodcast.episodes[this.state.playingEpisode.episode] : undefined;
        return (
            <React.Fragment>
                <ul>
                    <li>
                        <Link className='menu__link' to="/">Home</Link>
                    </li>
                </ul>
                <Route exact path='/' render={props =>
                    <PodcastList
                        {...props}
                        podcasts={this.state.podcasts}
                        onSelect={this.handlePodcastSelect}
                    />} />
                <Route path='/:id' render={props => {
                    return (
                        <EpisodeList
                            {...props}
                            podcast={selectedPodcast}
                            selectedPodcast={this.state.selectedPodcast}
                            onSelect={this.handleEpisodeSelect}
                            onUpdate={this.handlePodcastUpdate}
                        />)
                }}/>
                <Player {...playingEpisode} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
