import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import style from './HeroSlide.module.scss';
import Button from '../Button';
import Modal, { ModalContent } from '../Modal';

const cx = classNames.bind(style);

// HEROSLIDE
function HeroSlide() {
    const [moviesItems, setMoviesItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };

            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMoviesItems(response.results.slice(0, 4));
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);

    return (
        <div className={cx('hero-slide')}>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                slidesPerView={1}
                spaceBetween={0}
                autoplay={{ delay: 4500 }}
            >
                {moviesItems.map((item, i) => {
                    return (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem data={item} className={cx({ active: isActive })}></HeroSlideItem>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {moviesItems.map((item, i) => (
                <TrailerModal key={i} data={item}></TrailerModal>
            ))}
        </div>
    );
}

// HEROSLIDE CONTENT

const HeroSlideItem = (props) => {
    let navigate = useNavigate();

    const data = props.data;

    const backgr = apiConfig.originalImage(data.backdrop_path ? data.backdrop_path : data.poster_path);

    // handle modal
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${data.id}`);

        const videos = await tmdbApi.getVideos(category.movie, data.id);
        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('iframe').innerHTML = 'No Trailer';
        }
        modal.classList.toggle('active');
    };

    return (
        <div className={cx('hero-slide__item', `${props.className}`)} style={{ backgroundImage: `url(${backgr})` }}>
            <div className={cx('hero-slide__item__content', 'container')}>
                <div className={cx('hero-slide__item__info')}>
                    <h2 className={cx('title')}>{data.title}</h2>
                    <div className={cx('overview')}>{data.overview}</div>
                    <div className={cx('btns')}>
                        {/* cach 1 */}
                        <Button primary_btn onClick={() => navigate('/movie/' + data.id)}>
                            Watch now
                        </Button>
                        {/* cach 2 */}
                        {/* <Button primary_btn to={'/movie/' + data.id}>
                            Watch now
                        </Button> */}
                        <Button outline_btn onClick={setModalActive}>
                            Watch trailer
                        </Button>
                    </div>
                </div>
                <div className={cx('hero-slide__item__poster')}>
                    <img src={apiConfig.w500Image(data.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
};

// TRAILERMODAL

const TrailerModal = (props) => {
    const data = props.data;

    const iframeRef = useRef(null);
    const onClose = () => {
        iframeRef.current.setAttribute('src', '');
    };

    return (
        <Modal modalActive={false} id={`modal_${data.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="Trailer"></iframe>
            </ModalContent>
        </Modal>
    );
};

export default HeroSlide;
