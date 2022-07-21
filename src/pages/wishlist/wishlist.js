import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './wishlist.module.scss';
import { getAllWishlist } from '../../stores/actions/ActionWishlist';

import Title from '../../components/title/title';
import WishlistCard from '../../components/wishlist-card/wishlist-card';
import Spinner from '../../components/spinner/spinner';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { wishlist, loading } = useSelector(state => state.ReducerWishlist);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllWishlist(navigate));
    }, [dispatch]);

    const mapWishlist = params => {
        return params.map((wishlist, index) => {
            return <WishlistCard key={index} data={wishlist} />;
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
                    {'Wishlist Product'}
                </Title>
            </div>
            <div className={styles.main}>
                {loading ? <Spinner variant={'page'} /> : mapWishlist(wishlist)}
            </div>
        </section>
    );
};

export default WishlistPage;
