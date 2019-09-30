import React from 'react';

export function Episode({ title, onClick }) {
  return (
    <li className='episode-list__item'>
      <button className='episode-list-item__play' onClick={onClick}>
        Play
      </button>
      <p>{title}</p>
    </li>
  );
}