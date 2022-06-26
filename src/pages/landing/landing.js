import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './landing.module.scss';

// Components
import Card from '../../components/card/card';
import Button from '../../components/button/button';
import Title from '../../components/title/title';

// Assets
import search from '../../assets/icons/fi_search.svg';
import search_white from '../../assets/icons/fi_search_white.svg';

const dataMock = [
    {
        id: 1,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 200000,
    },
    {
        id: 2,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 400000,
    },
    {
        id: 3,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 600000,
    },
    {
        id: 4,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 800000,
    },
    {
        id: 5,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 1000000,
    },
    {
        id: 6,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 1200000,
    },
    {
        id: 7,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 1400000,
    },
];

const LandingPage = () => {
    const [filter, setFilter] = useState('semua');
    const navigate = useNavigate();

    const handleMapping = () => {
        return dataMock.map((value, index) => {
            return (
                <Card
                    key={index}
                    data={value}
                    onClick={() => navigate(`/product/${index}`)}
                />
            );
        });
    };
    return (
        <section className={styles.root}>
            <div className={styles.header}>
                <Title
                    tagElement={'h2'}
                    variant={'title-2'}
                    color={'black'}
                    weight={'bold'}
                >
                    {'Telusuri Kategori'}
                </Title>
            </div>
            <div className={styles.category}>
                <Button
                    type={'button'}
                    variant={filter === 'semua' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('semua')}
                >
                    <img
                        className={styles.icon}
                        src={filter === 'semua' ? search_white : search}
                        alt="logo-search-white"
                    />
                    {'Semua'}
                </Button>
                <Button
                    type={'button'}
                    variant={filter === 'hobi' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('hobi')}
                >
                    <img
                        className={styles.icon}
                        src={filter === 'hobi' ? search_white : search}
                        alt="logo-search"
                    />
                    {'Hobi'}
                </Button>
                <Button
                    type={'button'}
                    variant={filter === 'kendaraan' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('kendaraan')}
                >
                    <img
                        className={styles.icon}
                        src={filter === 'kendaraan' ? search_white : search}
                        alt="logo-search"
                    />
                    {'Kendaraan'}
                </Button>
                <Button
                    type={'button'}
                    variant={filter === 'baju' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('baju')}
                >
                    <img
                        className={styles.icon}
                        src={filter === 'baju' ? search_white : search}
                        alt="logo-search"
                    />
                    {'Baju'}
                </Button>
                <Button
                    type={'button'}
                    variant={filter === 'elektronik' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('elektronik')}
                >
                    <img
                        className={styles.icon}
                        src={filter === 'elektronik' ? search_white : search}
                        alt="logo-search"
                    />
                    {'Elektronik'}
                </Button>
                <Button
                    type={'button'}
                    variant={filter === 'kesehatan' ? 'primary' : 'secondary'}
                    onClick={() => setFilter('kesehatan')}
                >
                    <img
                        className={styles.icon}
                        src={filter === 'kesehatan' ? search_white : search}
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
