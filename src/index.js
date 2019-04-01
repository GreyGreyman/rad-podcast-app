import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { cors_api_url } from './utils'
import { Content } from './components/Content';
import { Player } from './components/Player';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            episodes: [],
            selected: null
        }
        this.handleEpisodeSelect = this.handleEpisodeSelect.bind(this);
    }

    componentDidMount = async () => {
        let xml = await fetch(cors_api_url + 'http://feed.syntax.fm/rss').then((res) => res.text());
        let domParser = new DOMParser();
        let doc = domParser.parseFromString(xml, 'text/xml');
        let items = doc.querySelectorAll('item');
        let episodes = [];
        items.forEach((episode) => {
            episodes.push({
                title: episode.querySelector('title').textContent,
                link: episode.querySelector('link').textContent
            })
        });
        episodes = episodes.slice(0, 5);
        this.setState({ episodes })
    }

    handleEpisodeSelect(i) {
        this.setState({ selected: i })
    }

    render() {
        let selected = this.state.episodes[this.state.selected];
        return (
            <React.Fragment>
                <Content episodes={this.state.episodes} onSelect={this.handleEpisodeSelect} />
                {selected !== undefined &&
                    <Player title={selected.title} link={selected.link} />
                }
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
