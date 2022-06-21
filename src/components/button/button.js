import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './button.module.scss';

const Button = ({ children, variant, color, type, ...props }) => (
    <button
        className={classNames(styles.root, styles[variant])}
        color={color}
        type={type}
        {...props}
    >
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
};

Button.defaultProps = {
    children: '',
    variant: 'primary',
    color: '',
    type: 'button',
};

export default Button;
