import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import tmdbApi, { category as cate, movieType, tvType } from '../../api/tmdbApi';
import MoviesCard from '../MoviesCard';
import style from './MoviesGrid.scss';
import Button from '../Button';

const cx = classNames.bind(style);

function MoviesGrid() {
    const paramsCurrent = useParams();

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            let params = {};
            if (paramsCurrent.keyword === undefined) {
                switch (paramsCurrent.category) {
                    case cate.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;

                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                        break;
                }
            } else {
                let params = {
                    query: paramsCurrent.keyword,
                };
                response = await tmdbApi.search(paramsCurrent.category, { params });
            }
            setTotalPage(response.total_pages);
            setItems(response.results);
        };
        getList();
    }, [paramsCurrent.category, paramsCurrent.keyword]);


    const handleLoadMore = async () => {
        let response = null;
            let params = {
                page: page + 1
            };
            if (paramsCurrent.keyword === undefined) {
                switch (paramsCurrent.category) {
                    case cate.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;

                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                        break;
                }
            } else {
                let params = {
                    page: page + 1,
                    query: paramsCurrent.keyword,
                };
                response = await tmdbApi.search(paramsCurrent.category, { params });
            }
            setPage(page+1);
            setItems([...items,...response.results]);
        };


    return (
        <>
            <div className={cx('moviesGrid')}>
                {items.map((item, i) => (
                    <MoviesCard
                        className={cx('moviesGrid__item')}
                        key={i}
                        category={paramsCurrent.category}
                        item={item}
                    ></MoviesCard>
                ))}
            </div>
            {page < totalPage ? (
                <div className={cx('moviesGrid__load_more')}>
                    <Button onClick={handleLoadMore} outline_btn>Load More</Button>
                </div>
            ) : null}
        </>
    );
}

export default MoviesGrid;
