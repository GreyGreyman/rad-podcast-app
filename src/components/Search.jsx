import React from 'react';
import { cors_api_url } from '../utils'
import { Link } from 'react-router-dom';

function SearchItem({ item, onSelect }) {
  console.log(item);
  return (
    <li className='search-item'>
      <Link to={`/podcasts/${item.trackId}`} className='search-item__link'>
        <img className='search-item__image' src={item.artworkUrl100} alt="" />
        <div>
          <p>{item.trackName}</p>
          <p>{item.artistName}</p>
        </div>
      </Link>
    </li>
  );
}

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.lastTerm = '';
    this.state = {
      results: [],
    }
  }

  // TODO: find a way to prevent setState on unmounted component
  async search() {
    console.log('Search start');
    let term = this.props.match.params.term;
    this.lastTerm = term;
    const response = await fetch(cors_api_url + `https://itunes.apple.com/search?media=podcast&term=${term}`)
      .then((res) => res.json());

    this.setState({ results: response.results })
    console.log('Search end');
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate() {
    if (this.lastTerm !== this.props.match.params.term) {
      this.search();
    }
  }


  render() {
    console.log("Search render");
    if (this.state.results.length === 0) {
      return <p>Nothing found!</p>;
    }
    const results = this.state.results.map((item) =>
      <SearchItem
        key={item.trackId}
        item={item}
        onSelect={this.props.onSelect}
      />
    );
    return (
      <ul className='search__list'>
        {results}
      </ul>
    );
  }
}