import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './transaction.module.scss';

// Components
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Spinner from '../../components/spinner/spinner';
import TransactionCard from '../../components/transaction-card/transaction-card';

// Assets
import iconEmpty from '../../assets/icons/fi_empty.svg';

// Actions
import { getBuyerBid } from '../../stores/actions/ActionBid';

const TransactionPage = () => {
    const [filter, setFilter] = useState('semua');
    const dispatch = useDispatch();
    const { buyerBids, loading } = useSelector(state => state.ReducerBid);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBuyerBid(navigate));
    }, [dispatch]);

    const handleTransaction = params => {
        if (params.length === 0)
            return (
                <div className={styles.empty}>
                    <img src={iconEmpty} alt={'icon-empty'} />
                    <Paragraph
                        className={styles['empty-text']}
                        variant={'body-1'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Yang sabar ya,'}
                        <br />
                        {'belum ada yang nawar nih'}
                    </Paragraph>
                </div>
            );
        return params.map((value, index) => {
            switch (true) {
                case filter === 'semua':
                    return <TransactionCard key={index} data={value} />;
                case filter === 'berlangsung' &&
                    (value.status === 'active' || value.status === 'accepted'):
                    return <TransactionCard key={index} data={value} />;
                case filter === 'ditolak' && value.status === 'declined':
                    return <TransactionCard key={index} data={value} />;
                case filter === 'selesai' && value.status === 'inactive':
                    return <TransactionCard key={index} data={value} />;
                default:
                    return null;
            }
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
            </div>
            <div className={styles.transaction}>
                {loading ? (
                    <Spinner variant={'page'} />
                ) : (
                    handleTransaction(buyerBids)
                )}
            </div>
        </section>
    );
};

export default TransactionPage;
