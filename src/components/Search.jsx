import React from 'react';
import { cors_api_url } from '../utils'


export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.lastTerm = '';
        this.state = {
            results: [],
        }
    }
    async search() {
        console.log('Search start');

        let term = this.props.match.params.query;
        this.lastTerm = term;
        const response = await fetch(cors_api_url + `https://itunes.apple.com/search?media=podcast&term=${term}`).then((res) => res.json());
        this.setState({ results: response.results })
        console.log('Search end');
    }

    render() {
        console.log("Search render");
        if (this.lastTerm !== this.props.match.params.query) {
            this.lastTerm = this.props.match.params.query;
            this.search();
        }
        let test = [];
        console.log(this.state.results);
        test = this.state.results.map((item) => {
            return (
                <li key={item.trackId}>
                    <p>{item.trackName}</p>
                    <p>{item.artistName}</p>
                </li>
            );
        });
        return (
            <ul>
                {test}
            </ul>
        );
    }
}