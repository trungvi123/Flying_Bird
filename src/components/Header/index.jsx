import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '../../assets';
import routes from '../../config/routeConfig';
import style from './Header.module.scss';

const cx = classNames.bind(style);

const headerNav = [
    {
        display: 'Home',
        path: '/Flying_Bird/',
    },
    {
        display: 'Movies',
        path: '/Flying_Bird/movie',
    },
    {
        display: 'TV Series',
        path: '/Flying_Bird/tv',
    },
];

function Header() {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex((e) => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.style.backgroundColor = '#000';
                headerRef.current.style.height = '5rem';
            } else {
                headerRef.current.style.backgroundColor = '';
                headerRef.current.style.height = '';
            }
        };
        window.addEventListener('scroll', shrinkHeader);

        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className={cx('header')}>
            <div className={cx('container', 'content')}>
                <Link to={routes.home} className={cx('logo')}>
                    <img src={logo} alt="logo" />
                </Link>
                <nav>
                    <ul className={cx('nav')}>
                        {headerNav.map((e, i) => {
                            let navActive = false;
                            if (i === active) {
                                navActive = true;
                            }

                            return (
                                <li key={i} className={cx({ navActive })}>
                                    <Link to={e.path}>{e.display}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
