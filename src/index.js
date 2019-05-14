import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import { Search } from './components/Search';
import { PodcastList } from './components/PodcastList'
import { PodcastDetail } from './components/PodcastDetail';
import { Player } from './components/Player';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import podcasts_stub from './podcasts_stub';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: podcasts_stub,
      searchPodcast: null,
      playingEpisode: undefined,
    }
    this.handleEpisodeSelect = this.handleEpisodeSelect.bind(this);
    this.handlePodcastSearchSelect = this.handlePodcastSearchSelect.bind(this);
    this.handlePodcastUpdate = this.handlePodcastUpdate.bind(this);
  }

  handleSubscribe = (podcast) => {
    this.setState(
      { podcasts: { ...this.state.podcasts, ...podcast } }
    );
  }

  handleEpisodeSelect(playingEpisode) {
    this.setState({ playingEpisode });
  }

  handlePodcastSearchSelect(searchPodcast) {
    this.setState({ searchPodcast })
  }

  handlePodcastUpdate(key, podcast) {
    let podcasts = { ...this.state.podcasts };
    podcasts[key] = podcast;
    this.setState({ podcasts });
  }

  render() {

    return (
      <React.Fragment>

        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/' render={props => <Redirect {...props} to='/podcasts' />} />
            <Route path='/search/:term' render={props => <Search {...props} onSelect={this.handlePodcastUpdate} />} />
            <Route exact path='/podcasts' render={route_props =>
              <PodcastList {...route_props} podcasts={this.state.podcasts} />}
            />
            <Route path='/podcasts/:id' render={route_props =>
              <PodcastDetail
                {...route_props}
                podcast={this.state.podcasts[route_props.match.params.id]}
                onEpisodeSelect={this.handleEpisodeSelect}
                onPodcastUpdate={this.handlePodcastUpdate}
                onSubscribe={this.handleSubscribe}
              />}
            />
          </Switch>
        </div>
        <Player {...this.state.playingEpisode} />

      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));
