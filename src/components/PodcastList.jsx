import React from 'react';
import { Link } from 'react-router-dom';


export class PodcastList extends React.Component {

  render() {
    let podcastList = Object.entries(this.props.podcasts).map(([key, item]) => {
      return (
        <li key={key}>
          <Link to={`/podcasts/${key}`}>{item.title}</Link>
        </li>
      );
    })
    return (
      <ul>
        {podcastList}
      </ul>
    );
  }
}