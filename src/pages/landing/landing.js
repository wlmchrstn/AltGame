import React from 'react';
import styles from './landing.module.scss';
import Card from '../../components/card/card';

const LandingPage = () => {
    const dataMock = [
        'Jam Tangan A',
        'Jam Tangan B',
        'Jam Tangan C',
        'Jam Tangan D',
        'Jam Tangan E',
        'Jam Tangan F',
        'Jam Tangan A',
        'Jam Tangan B',
        'Jam Tangan C',
        'Jam Tangan D',
        'Jam Tangan E',
        'Jam Tangan F',
    ];

    const handleMapping = () => {
        return dataMock.map((value, index) => {
            console.log(value);
            return <Card key={index} title={value}></Card>;
        });
    };
    return (
        <div className={styles.root}>
            <h1>Landing Page</h1>
            <h2>test pr</h2>
            <h3>test eslint</h3>
            <br></br>
            <Card title="title"></Card>
            <div className={styles.product}>{handleMapping()}</div>
        </div>
    );
};

export default LandingPage;
