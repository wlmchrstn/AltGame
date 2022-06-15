import React from 'react';
import Title from '../../components/title/title';
import styles from './landing.module.scss';

const LandingPage = () => {
    return (
        <div className={styles.root}>
            <h1>Landing Page</h1>
            <h2>test pr</h2>
            <h3>test eslint</h3>
            <Title
                tagElement={'h1'}
                variant={'heading-1-light'}
                color={'white'}
            >
                Test title
            </Title>
        </div>
    );
};

export default LandingPage;
