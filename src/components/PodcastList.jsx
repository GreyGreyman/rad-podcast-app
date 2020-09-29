import React from 'react';
import { Link } from 'react-router-dom';

const PodcastListItem = ({ image, title }) => (
  <React.Fragment>
    <img
      className='podcast-list-item__image'
      src={image}
      alt={`${title} podcast logo`}
    />
    {title}
  </React.Fragment>
)

const PodcastList = ({ podcasts }) => (
  <ul className='podcast-list'>
    {Object.entries(podcasts).map(([key, item]) => (
      <li className='podcast-list__item' key={key}>
        <Link to={`/podcasts/${key}`} className='podcast-list-item'>
          <PodcastListItem {...item} />
        </Link>
      </li>
    ))}
  </ul>
)

export default PodcastList