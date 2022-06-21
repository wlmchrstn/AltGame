import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './notification.module.scss';

import Paragraph from '../paragraph/paragraph';

const Notification = ({ message, variant }) => {
    useEffect(() => {
        console.log('useEffect');
    }, []);

    return createPortal(
        <div className={classNames(styles.root, styles[variant])}>
            <Paragraph variant={'body-1'} color={'white'}>
                {message}
            </Paragraph>
        </div>,
        document.getElementById('notification')
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
};

Notification.defaultProps = {
    message: 'Notification message',
    variant: 'success',
};

export default Notification;
