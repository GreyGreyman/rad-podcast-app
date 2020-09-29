import React, { useEffect, useState } from 'react';
import { cors_api_url } from '../utils/utils'
import { Link, useParams } from 'react-router-dom';

const SearchResultsItem = ({ item }) => (
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

const SearchResults = () => {
  const [results, setResults] = useState([])
  const term = useParams().term;

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(cors_api_url + `https://itunes.apple.com/search?media=podcast&term=${term}`)
        .then((res) => res.json());
      setResults(response.results)
    }
    fetchdata()
  }, [term])

  if (results.length === 0) {
    return <p>Nothing found!</p>;
  }

  return (
    <ul className='search__list'>
      {results.map(item =>
        <SearchResultsItem
          key={item.trackId}
          item={item}
        />
      )}
    </ul>
  );
}

export default SearchResults