import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import style from './Modal.scss';

const cx = classNames.bind(style);

// MODAL PARENT
function Modal({ modalActive, id, children }) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(modalActive);
    }, [modalActive]);
    return (
        <div id={id} className={cx('modal', { active })}>
            {children}
        </div>
    );
}

Modal.propTypes = {
    modalActive: PropTypes.bool,
    id: PropTypes.string,
};

//MODAL CONTENT

export const ModalContent = ({ children, onClose }) => {
    const ModalContentRef = useRef(null);

    const handleClose = () => {
        ModalContentRef.current.parentNode.classList.remove('active');
        if (onClose) {
            onClose();
        }
    };

    return (
        <div ref={ModalContentRef} className={cx('modal__content')}>
            {children}

            <div onClick={() => handleClose()} className={cx('modal__content--close')}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
};

export default Modal;
