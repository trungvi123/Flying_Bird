import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

import routes from '../../config/routeConfig';
import { footerImg, logo } from '../../assets';
import style from './Footer.module.scss';

const cx = classNames.bind(style);

function Footer() {
    return (
        <div style={{ backgroundImage: `url(${footerImg})` }} className={cx('footer')}>
            <div className={cx('container', 'footer__content')}>
                <Link to={routes.home} className={cx('logo')}>
                    <img src={logo} alt="logo" />
                </Link>

                <div className={cx('footer__list')}>
                    <div className={cx('footer__list__item')}>
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of seevices</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className={cx('footer__list__item')}>
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>
                    <div className={cx('footer__list__item')}>
                        <Link to="/">You must wattch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>

                <div className={cx('contact')}>
                    <a href="https://www.facebook.com/gom.gomVvvv/">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://github.com/trungvi123">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
