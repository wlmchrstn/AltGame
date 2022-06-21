import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './modal.module.scss';
import x from '../../assets/icons/fi_x.svg';

const Modal = ({ children, open, onClose, className }) => {
    if (!open) return null;
    return createPortal(
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={classNames(styles.content, className)}>
                <img
                    className={styles.image}
                    src={x}
                    alt={'fi_x'}
                    onClick={onClose}
                />
                {children}
            </div>
        </>,
        document.getElementById('portal')
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    className: PropTypes.any,
};

Modal.defaultProps = {
    children: <p>modal</p>,
    onClose: null,
    open: false,
    className: null,
};

export default Modal;
