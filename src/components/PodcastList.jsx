import React from 'react';
import { Link } from 'react-router-dom';


export class PodcastList extends React.Component {
    
    render() {
        let podcastList = this.props.podcasts.map((item, index) => {
            return (
                <li>
                    <Link to={`/${index}`} onClick={() => this.props.onSelect(index)}>{item.title}</Link>
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