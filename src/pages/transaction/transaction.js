import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './transaction.module.scss';
import {
    getAllWishlist,
    deleteWishlist,
} from '../../stores/actions/ActionWishlist';
import { setToken } from '../../utils/helper';

import Button from '../../components/button/button';
import TransactionCard from '../../components/transaction-card/transaction-card';
import WishlistCard from '../../components/wishlist-card/wishlist-card';

const data = {
    id: 1,
    title: 'Jam Tangan Casio',
    category: 'Aksesoris',
    harga: 200000,
};

const TransactionPage = props => {
    const [filter, setFilter] = useState('semua');

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
        }
        props.getAllWishlist();
    }, []);

    const mapWishlist = params => {
        console.log(params);
        if (params === []) return null;
        return params.map((value, index) => {
            return <WishlistCard data={value} key={index} />;
        });
    };

    return (
        <section className={styles.root}>
            <div className={styles['button-group']}>
                <Button
                    variant={filter === 'semua' ? 'primary' : 'secondary'}
                    type={'button'}
                    onClick={() => setFilter('semua')}
                >
                    {'Semua'}
                </Button>
                <Button
                    variant={filter === 'berlangsung' ? 'primary' : 'secondary'}
                    type={'button'}
                    onClick={() => setFilter('berlangsung')}
                >
                    {'Berlangsung'}
                </Button>
                <Button
                    variant={filter === 'ditolak' ? 'primary' : 'secondary'}
                    type={'button'}
                    onClick={() => setFilter('ditolak')}
                >
                    {'Ditolak'}
                </Button>
                <Button
                    variant={filter === 'selesai' ? 'primary' : 'secondary'}
                    type={'button'}
                    onClick={() => setFilter('selesai')}
                >
                    {'Selesai'}
                </Button>
                <Button
                    variant={filter === 'wishlist' ? 'primary' : 'secondary'}
                    type={'button'}
                    onClick={() => setFilter('wishlist')}
                >
                    {'Wishlist'}
                </Button>
            </div>
            <div className={styles.transaction}>
                {filter === 'wishlist' ? (
                    mapWishlist(props.wishlist)
                ) : (
                    <>
                        <TransactionCard data={data} variant={'selesai'} />
                        <TransactionCard data={data} variant={'ditolak'} />
                        <TransactionCard data={data} variant={'waiting'} />
                    </>
                )}
            </div>
        </section>
    );
};

TransactionPage.propTypes = {
    getAllWishlist: PropTypes.func,
    wishlist: PropTypes.any,
};

TransactionPage.defaultProps = {
    getAllWishlist: null,
    wishlist: [],
};

const mapStateToProps = state => {
    return {
        wishlist: state.ReducerWishlist.wishlist,
    };
};

const TransactionPageConnect = connect(mapStateToProps, {
    getAllWishlist,
    deleteWishlist,
})(TransactionPage);

export default TransactionPageConnect;
