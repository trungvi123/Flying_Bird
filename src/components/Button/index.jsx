import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import style from './Button.scss';

const cx = classNames.bind(style);

function Button({
    children,
    to,
    href,
    primary_btn = false,
    outline_btn = false,
    small_btn = false,
    medium_btn = false,
    large_btn = false,
    onClick,
    className,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    const classes = cx({
        [className]: className,
        primary_btn,
        outline_btn,
        small_btn,
        medium_btn,
        large_btn,
    });

    return <Comp className={classes} {...props}>{children}</Comp>;
}

export default Button;
