import React from 'react';
import styles from './navbar.module.scss';
import logo from '../../assets/images/logo.svg';

const Navbar = () => {
    return (
        <section className={styles.root}>
            <div className={styles['logo-wrapper']}>
                <img src={logo} alt={'logo'} />
            </div>
        </section>
    );
};

export default Navbar;
