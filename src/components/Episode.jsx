import React from 'react';

const Episode = ({ title, onClick }) => (
  <li className='episode-list__item'>
    <p>{title}</p>
    <button className='episode-list-item__play' onClick={onClick}>
      Play
    </button>
  </li>
);

export default Episode