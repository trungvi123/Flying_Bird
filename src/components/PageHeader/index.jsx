import classNames from 'classnames/bind';

import style from './PageHeader.scss';
import { footerImg as bg } from '../../assets';


const cx = classNames.bind(style);

function PageHeader(props) {
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className={cx('PageHeader')}>
            <h2>{props.children}</h2>
        </div>
    );
}

export default PageHeader;
