import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const Header = () => {
  const history = useHistory()

  const handleSubmit = e => {
    let text = e.target.search.value;
    text = text.replace(/ /gi, '+');
    history.push('/search/' + text);
    e.target.search.value = '';
    e.preventDefault();
  }

  return (
    <header className='site-header'>
      <nav>
        <ul className='site-navigation'>
          <li>
            <Link className='site-navigation__link' to="/">
              Rad Podcast App
            </Link>
          </li>
        </ul>
      </nav>

      <form className='search' onSubmit={handleSubmit}>
        <input
          name='search'
          className='search__input'
          type="text"
          placeholder="Find podcasts"
        />
      </form>
    </header>
  )
}

export default Header;