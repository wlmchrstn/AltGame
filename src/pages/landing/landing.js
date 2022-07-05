import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './landing.module.scss';

// Components
import Card from '../../components/card/card';
import Button from '../../components/button/button';
import Title from '../../components/title/title';

// Assets
import search from '../../assets/icons/fi_search.svg';
import search_white from '../../assets/icons/fi_search_white.svg';
import { getAllProduct } from '../../stores/actions/ActionProduct';

const LandingPage = () => {
    const [filter, setFilter] = useState('semua');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { listProducts, loading } = useSelector(
        state => state.ReducerProduct
    );

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const handleMapping = () => {
        return listProducts.map((value, index) => {
            return (
                <Card
                    key={index}
                    data={value}
                    onClick={() => navigate(`/product/${value.productId}`)}
                />
            );
        });
    };

    if (loading === true) return <p>loading</p>;
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
