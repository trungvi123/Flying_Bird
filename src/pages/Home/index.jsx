import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeroSlide from '../../components/HeroSlide';
import style from './Home.module.scss';
import Button from '../../components/Button';
import MoviesList from '../../components/MoviesList';
import { category, movieType, tvType } from '../../api/tmdbApi';

const cx = classNames.bind(style);

function Home() {
    return (
        <div className={cx('wrapper')}>
            
            <HeroSlide></HeroSlide>
            <div className={cx('container')}>
                <section className={cx('section mb-3')}>
                    <div className={cx('section__header mb-2')}>
                        <h2>Trending Movies</h2>
                        <Link to="Flying_Bird/movies">
                            <Button outline_btn small_btn>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MoviesList category={category.movie} type={movieType.popular}></MoviesList>
                </section>

                <section className={cx('section mb-3')}>
                    <div className={cx('section__header mb-2')}>
                        <h2>Top Rated Movies</h2>
                        <Link to="Flying_Bird/movies">
                            <Button outline_btn small_btn>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MoviesList category={category.movie} type={movieType.top_rated}></MoviesList>
                </section>

                <section className={cx('section mb-3')}>
                    <div className={cx('section__header mb-2')}>
                        <h2>Up Coming</h2>
                        <Link to="Flying_Bird/movies">
                            <Button outline_btn small_btn>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MoviesList category={category.movie} type={movieType.upcoming}></MoviesList>
                </section>

                <section className={cx('section mb-3')}>
                    <div className={cx('section__header mb-2')}>
                        <h2>Trending TV</h2>
                        <Link to="Flying_Bird/tv">
                            <Button outline_btn small_btn>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MoviesList category={category.tv} type={tvType.popular}></MoviesList>
                </section>

                <section className={cx('section mb-3')}>
                    <div className={cx('section__header mb-2')}>
                        <h2>Top Rated TV</h2>
                        <Link to="Flying_Bird/tv">
                            <Button outline_btn small_btn>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MoviesList category={category.tv} type={tvType.top_rated}></MoviesList>
                </section>

                <section className={cx('section mb-3')}>
                    <div className={cx('section__header mb-2')}>
                        <h2>On The Air</h2>
                        <Link to="Flying_Bird/tv">
                            <Button outline_btn small_btn>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MoviesList category={category.tv} type={tvType.on_the_air}></MoviesList>
                </section>
                
            </div>
        </div>
    );
}

export default Home;
