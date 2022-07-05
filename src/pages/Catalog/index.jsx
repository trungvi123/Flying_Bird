import {useParams} from 'react-router-dom'
import classNames from 'classnames/bind';

import {category as cate} from '../../api/tmdbApi'
import PageHeader from '../../components/PageHeader';
import style from './Catalog.module.scss'
import MoviesGrid from '../../components/MoviesGrid'

const cx = classNames.bind(style);

function Catalog() {
    const {category} = useParams();
    return ( <div>
        <PageHeader>{category === cate.movie ? 'Movies' : 'TV SERIS'}</PageHeader>

        <div className={cx('container')}>
            <section className={cx('section','mb-3')}>
                <MoviesGrid></MoviesGrid>
            </section>
        </div>

    </div> );
}

export default Catalog;