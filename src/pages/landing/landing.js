import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './landing.module.scss';

// Components
import Card from '../../components/card/card';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Spinner from '../../components/spinner/spinner';

// Assets
import search from '../../assets/icons/fi_search.svg';
import search_white from '../../assets/icons/fi_search_white.svg';

// Modules
import Carousel from '../../modules/carousel/carousel';

// Actions
import { getAllProduct } from '../../stores/actions/ActionProduct';
import { getUser } from '../../stores/actions/ActionAuth';
import { getAllWishlist } from '../../stores/actions/ActionWishlist';

const LandingPage = () => {
    const [filter, setFilter] = useState('Semua');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { listProducts, loading } = useSelector(
        state => state.ReducerProduct
    );
    const { wishlist } = useSelector(state => state.ReducerWishlist);
    const wishlistLoading = useSelector(state => state.ReducerWishlist.loading);

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAllProduct());
        dispatch(getAllWishlist());
    }, [dispatch]);

    const handleMapping = params => {
        return listProducts.map((value, index) => {
            if (params === 'Semua')
                return (
                    <Card
                        key={index}
                        data={value}
                        onClick={() => navigate(`/product/${value.productId}`)}
                    />
                );
            if (params === value.category)
                return (
                    <Card
                        key={index}
                        data={value}
                        onClick={() => navigate(`/product/${value.productId}`)}
                    />
                );
        });
    };

    const mapWishlist = () => {
        if (wishlist.length !== 0) {
            return (
                <>
                    <div className={styles.header}>
                        <Title
                            tagElement={'h2'}
                            variant={'title-2'}
                            color={'black'}
                            weight={'bold'}
                        >
                            {'Wujudkan Impianmu'}
                        </Title>
                    </div>
                    <div className={styles['product-wishlist']}>
                        {wishlist.map((value, index) => {
                            return (
                                <Card
                                    key={index}
                                    data={value.product}
                                    onClick={() => navigate(`/wishlist`)}
                                />
                            );
                        })}
                    </div>
                </>
            );
        }
    };

    return (
        <section className={styles.root}>
            <Carousel />
            {wishlistLoading ? null : mapWishlist()}
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
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={filter === 'Semua' ? 'primary' : 'secondary'}
                        onClick={() => setFilter('Semua')}
                    >
                        <img
                            className={styles.icon}
                            src={filter === 'Semua' ? search_white : search}
                            alt="logo-search-white"
                        />
                        {'Semua'}
                    </Button>
                </div>
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={filter === 'Console' ? 'primary' : 'secondary'}
                        onClick={() => setFilter('Console')}
                    >
                        <img
                            className={styles.icon}
                            src={filter === 'Console' ? search_white : search}
                            alt="logo-search"
                        />
                        {'Console'}
                    </Button>
                </div>
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={
                            filter === 'Video Game' ? 'primary' : 'secondary'
                        }
                        onClick={() => setFilter('Video Game')}
                    >
                        <img
                            className={styles.icon}
                            src={
                                filter === 'Video Game' ? search_white : search
                            }
                            alt="logo-search"
                        />
                        {'Video Game'}
                    </Button>
                </div>
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={
                            filter === 'Controller' ? 'primary' : 'secondary'
                        }
                        onClick={() => setFilter('Controller')}
                    >
                        <img
                            className={styles.icon}
                            src={
                                filter === 'Controller' ? search_white : search
                            }
                            alt="logo-search"
                        />
                        {'Controller'}
                    </Button>
                </div>
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={
                            filter === 'Aksesoris' ? 'primary' : 'secondary'
                        }
                        onClick={() => setFilter('Aksesoris')}
                    >
                        <img
                            className={styles.icon}
                            src={filter === 'Aksesoris' ? search_white : search}
                            alt="logo-search"
                        />
                        {'Aksesoris'}
                    </Button>
                </div>
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={
                            filter === 'Board Game' ? 'primary' : 'secondary'
                        }
                        onClick={() => setFilter('Board Game')}
                    >
                        <img
                            className={styles.icon}
                            src={
                                filter === 'Board Game' ? search_white : search
                            }
                            alt="logo-search"
                        />
                        {'Board Game'}
                    </Button>
                </div>
                <div className={styles.wrapper}>
                    <Button
                        type={'button'}
                        variant={
                            filter === 'Collectible' ? 'primary' : 'secondary'
                        }
                        onClick={() => setFilter('Collectible')}
                    >
                        <img
                            className={styles.icon}
                            src={
                                filter === 'Collectible' ? search_white : search
                            }
                            alt="logo-search"
                        />
                        {'Collectible'}
                    </Button>
                </div>
            </div>
            {loading ? (
                <div styles={{ marginTop: '40px' }}>
                    <Spinner variant={'page'} />
                </div>
            ) : (
                <div className={styles.product}>{handleMapping(filter)}</div>
            )}
        </section>
    );
};

export default LandingPage;
