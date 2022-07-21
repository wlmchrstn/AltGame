import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './navbar-modal.module.scss';

const NavbarModal = ({ children, open, onClose, className }) => {
    if (!open) return null;
    return createPortal(
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.position} onClick={onClose}>
                <div className={classNames(styles.content, className)}>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

NavbarModal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    className: PropTypes.any,
};

NavbarModal.defaultProps = {
    children: <p>modal</p>,
    onClose: null,
    open: false,
    className: null,
};

export default NavbarModal;
