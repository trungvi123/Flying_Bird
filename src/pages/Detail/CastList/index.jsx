import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../../api/apiConfig';

import tmdbApi from '../../../api/tmdbApi';
import style from '../Detail.module.scss';

const cx = classNames.bind(style);

function CastList() {
    const [casts, setCasts] = useState([]);
    const { category, id } = useParams();

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, id);
            setCasts(res.cast.slice(0,5));
           
        };

        getCredits();
    }, [category, id]);

    return (
        <div className={cx('casts')}>
            {casts && casts.map((item,i) => (
                <div key={i} className={cx('casts-item')}>
                    <div className={cx('casts-item__img')} style={{backgroundImage:`url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                    <p className={cx('casts-item__name')}> {item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastList;
