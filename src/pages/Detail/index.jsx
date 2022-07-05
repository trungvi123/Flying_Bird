import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';

import tmdbApi from '../../api/tmdbApi';
import style from './Detail.module.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MoviesList from '../../components/MoviesList';
const cx = classNames.bind(style);

function Detail() {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    console.log(category);
    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, id]);
    return (
        <>
            {item && (
                <>
                    <div
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`,
                        }}
                        className={cx('banner')}
                    ></div>

                    <div className={cx('mb-3', 'movies-content')}>
                        <div className={cx('movies-content__poster')}>
                            <div
                                className={cx('movies-content__img')}
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(
                                        item.backdrop_path || item.poster_path,
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className={cx('movies-content__info')}>
                            <div className={cx('title')}>{item.title || item.name}</div>
                            <div className={cx('genres')}>
                                {item.genres &&
                                    item.genres.slice(0, 5).map((gen, i) => <span key={i}>{gen.name}</span>)}
                            </div>
                            <p>{item.overview}</p>
                            <div className={cx('section__header')}>
                                <h2>Casts</h2>
                            </div>
                            <CastList></CastList>
                        </div>
                    </div>

                    <div className={cx('container')}>
                        <div className={cx('section', 'mb-3')}>
                            <VideoList></VideoList>
                        </div>
                        <div className={cx('section', 'mb-3')}>
                            <h2>Similar</h2>
                            <MoviesList category={category} type="similar" id={id}></MoviesList>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Detail;
