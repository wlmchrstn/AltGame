import React from 'react';
import styles from './landing.module.scss';

// Components
import Card from '../../components/card/card';
import Button from '../../components/button/button';
import Title from '../../components/title/title';

// Assets
import search from '../../assets/icons/fi_search.svg';
import search2 from '../../assets/icons/fi_search_white.svg';

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
        <section className={styles.root}>
            <div className={styles.header}>
                <Title
                    tagElement={'h2'}
                    variant={'title-2-bold'}
                    color={'black'}
                >
                    {'Telusuri'}
                </Title>
            </div>
            <div className={styles.category}>
                <Button
                    type={'button'}
                    variant={'primary-search'}
                    color={'white'}
                >
                    <img
                        className={styles.icon}
                        src={search2}
                        alt="logo-search-white"
                    />
                    {'Semua'}
                </Button>
                <Button
                    type={'button'}
                    variant={'secondary-search'}
                    color={'black'}
                >
                    <img
                        className={styles.icon}
                        src={search}
                        alt="logo-search"
                    />
                    {'Hobi'}
                </Button>
                <Button
                    type={'button'}
                    variant={'secondary-search'}
                    color={'black'}
                >
                    <img
                        className={styles.icon}
                        src={search}
                        alt="logo-search"
                    />
                    {'Kendaraan'}
                </Button>
                <Button
                    type={'button'}
                    variant={'secondary-search'}
                    color={'black'}
                    withIcon={search}
                >
                    <img
                        className={styles.icon}
                        src={search}
                        alt="logo-search"
                    />
                    {'Baju'}
                </Button>
                <Button
                    type={'button'}
                    variant={'secondary-search'}
                    color={'black'}
                >
                    <img
                        className={styles.icon}
                        src={search}
                        alt="logo-search"
                    />
                    {'Elektronik'}
                </Button>
                <Button
                    type={'button'}
                    variant={'secondary-search'}
                    color={'black'}
                >
                    <img
                        className={styles.icon}
                        src={search}
                        alt="logo-search"
                    />
                    {'Kesehatan'}
                </Button>
            </div>
            <div className={styles.product}>{handleMapping()}</div>
        </section>
    );
};

export default LandingPage;
