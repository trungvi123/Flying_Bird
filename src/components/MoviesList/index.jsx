import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import tmdbApi, { category } from '../../api/tmdbApi';
import style from './MoviesList.module.scss';
import MoviesCard from '../MoviesCard';

const cx = classNames.bind(style);

function MoviesList(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setData(response.results);
        };
        getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('movie-list')}>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {data.map((item, i) => (
                    <SwiperSlide className={cx('movie-list__slide')} key={i}>
                        <MoviesCard item={item} category={props.category}></MoviesCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MoviesList;
