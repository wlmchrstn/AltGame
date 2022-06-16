import React from 'react';
import styles from './landing.module.scss';
import Button from '../../components/button/button';

const LandingPage = () => {
    return (
        <div className={styles.root}>
            <h1>Landing Page</h1>
            <h2>test pr</h2>
            <h3>test eslint</h3>
            <Button variant={'primary'}>{'Button'}</Button>
        </div>
    );
};

export default LandingPage;
