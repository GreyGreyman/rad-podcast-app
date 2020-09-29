import React from 'react';
import Header from './components/Header';
import { Search } from './components/Search';
import { PodcastList } from './components/PodcastList'
import { PodcastDetail } from './components/PodcastDetail';
import Player from './components/Player';
import podcasts_stub from './utils/podcasts_stub';
import { Route, Redirect, Switch } from 'react-router-dom';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: podcasts_stub,
      searchPodcast: null,
      playingEpisode: undefined,
      history: [],
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

  updateHistory = (history, episode) => {
    let newEntry = episode;
    let newHistory = history.filter(entry =>
    {
      //check by guid not by link
      if (entry.link === episode.link) {
        //there must be logic of continue listen timer or reset
        newEntry = entry;
        return false;
      }
      return true;
    }
    );

    newHistory.push(newEntry);
    return newHistory;
  }

  handleEpisodeSelect(playingEpisode) {
    this.setState({
      playingEpisode,
      history: this.updateHistory(this.state.history, playingEpisode),
    });

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
            <Route path='/search/:term' render={route_props =>
              <Search {...route_props} onSelect={this.handlePodcastUpdate} />} />
            <Route exact path='/' render={route_props =>
              <Redirect {...route_props} to='/podcasts' />} />
            <Route exact path='/podcasts' render={route_props =>
              <PodcastList {...route_props} podcasts={this.state.podcasts} />} />
            <Route path='/podcasts/:id' render={route_props =>
              <PodcastDetail
                {...route_props}
                podcast={this.state.podcasts[route_props.match.params.id]}
                onEpisodeSelect={this.handleEpisodeSelect}
                onPodcastUpdate={this.handlePodcastUpdate}
                onSubscribe={this.handleSubscribe}
              />} />
          </Switch>
        </div>
        <Player {...this.state.playingEpisode} />

      </React.Fragment>
    )
  }
}

export default App;
