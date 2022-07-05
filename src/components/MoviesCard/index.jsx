import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import  { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import Button from '../Button';
import style from './MoviesCard.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);

function MoviesCard(props) {
    const item = props.item;

    const link = '/' + category[props.category] + '/' + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className={cx('movies-card')} style={{ backgroundImage: `url(${bg})` }}>
                <Button primary_btn>
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MoviesCard;
