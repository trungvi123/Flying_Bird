import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../../api/tmdbApi';
import style from '../Detail.module.scss';

const cx = classNames.bind(style);

function VideoList() {
    const [video, setVideo] = useState([]);
    const { category, id } = useParams();

    useEffect(() => {
        const getVideo = async () => {
            const res = await tmdbApi.getVideos(category, id);
            setVideo(res.results.slice(0, 5));
        };

        getVideo();
    }, [category, id]);

    return (
        <>
            {video.map((item, i) => (
                <Video key={i} item={item}></Video>
            ))}
        </>
    );
}

const Video = (props) => {
    const item = props.item;
    const iframeRef = useRef(null)

    useEffect(()=>{
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height',height)
    })

    return (
        <div className={cx('video')}>
            <div className={cx('video__title')}>
                <h2>{item.name}</h2>
            </div>
            <iframe ref={iframeRef} src={`https://www.youtube.com/embed/${item.key}`} width="100%" title="video"></iframe>
        </div>
    );
};

export default VideoList;
