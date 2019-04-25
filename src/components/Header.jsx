import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    const input = document.querySelector('#search');
    let text = document.querySelector('#search').value;
    input.value = '';
    text = text.replace(/ /gi, '+');
    this.props.history.push('/search/' + text);
    e.preventDefault();
  }
  render() {
    return (
      <header className='site-header'>
        <nav>
          <ul className='site-navigation'>
            <li>
              <Link className='site-navigation__link' to="/">Rad Podcast App</Link>
            </li>
          </ul>
        </nav>

        <form className='search' onSubmit={this.handleSubmit}>
          <input className='search__input' id='search' type="text" placeholder="Find podcasts" />
        </form>
      </header>
    )
  }
}

export default withRouter(Header);