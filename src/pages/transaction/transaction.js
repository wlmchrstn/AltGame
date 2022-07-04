import React, { useState } from 'react';
import styles from './transaction.module.scss';

import Button from '../../components/button/button';
import TransactionCard from '../../components/transaction-card/transaction-card';
import WishlistCard from '../../components/wishlist-card/wishlist-card';

const data = {
    id: 1,
    title: 'Jam Tangan Casio',
    category: 'Aksesoris',
    harga: 200000,
};

const TransactionPage = () => {
    const [filter, setFilter] = useState('semua');

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
                    <WishlistCard data={data} />
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

export default TransactionPage;
