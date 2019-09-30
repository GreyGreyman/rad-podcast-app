import React from 'react';
import { Link } from 'react-router-dom';


export class PodcastList extends React.Component {

  render() {
    let podcastList = Object.entries(this.props.podcasts).map(([key, item]) => {
      return (
        <li className='podcast-list__item' key={key}>
          <Link to={`/podcasts/${key}`} className='podcast-list-item'>
            <img
              className='podcast-list-item__image'
              src={item.image}
              alt={`${item.title} podcast logo`}
            />
            {item.title}
          </Link>
        </li>
      );
    })
    return (
      <ul className='podcast-list'>
        {podcastList}
      </ul>
    );
  }
}