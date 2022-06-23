import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './button.module.scss';

const Button = ({ children, variant, type, className, ...props }) => {
    return (
        <button
            className={classNames(
                styles.root,
                styles[variant],
                styles[className]
            )}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
};

Button.defaultProps = {
    children: '',
    variant: 'primary',
    type: 'button',
    className: null,
};

export default Button;
