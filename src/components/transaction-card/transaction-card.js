import React, { useState } from 'react';
import styles from './transaction-card.module.scss';
import PropTypes from 'prop-types';
import { formatRupiah } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

// Components
import Paragraph from '../paragraph/paragraph';
import Button from '../button/button';
import Modal from '../modal/modal';

// Assets
import shoppingBag from '../../assets/icons/fi_shopping-bag.svg';

const TransactionCard = ({ data, ...props }) => {
    const { createdAt, productId, name, category, price, image, status } = data;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handlePembayaran = () => {
        console.log('handle');
    };

    const mapButton = () => {
        if (status === 'accepted') {
            return (
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => setIsOpen(true)}
                >
                    {'Upload bukti pembayaran'}
                </Button>
            );
        } else if (status === 'inactive') {
            return (
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => console.log('invoice')}
                >
                    {'Lihat Invoice'}
                </Button>
            );
        } else {
            return (
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => navigate(`/product/${productId}`)}
                >
                    {'Lihat halaman produk'}
                </Button>
            );
        }
    };
    return (
        <div className={styles.root} {...props}>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <Button
                    type={'submit'}
                    variant={'primary'}
                    onClick={() => handlePembayaran()}
                >
                    {'Upload bukti pembayaran'}
                </Button>
            </Modal>
            <div className={styles.header}>
                <img src={shoppingBag} alt={'fi_shopping-bag'} />
                <div className={styles['header-content']}>
                    <div className={styles['header-detail']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {'Belanja'}
                        </Paragraph>
                        <Paragraph variant={'body-3'} color={'neutral'}>
                            {createdAt}
                        </Paragraph>
                    </div>
                    <Paragraph className={styles[status]} variant={'body-1'}>
                        {status === 'accepted'
                            ? 'Menunggu Pembayaran'
                            : status === 'active'
                            ? 'Menunggu penjual'
                            : status === 'declined'
                            ? 'Ditolak'
                            : status === 'inactive'
                            ? 'Selesai'
                            : status}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles['content-top']}>
                    <img src={image} alt={'imgcard'} />
                    <div className={styles['content-product']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {name}
                        </Paragraph>
                        <Paragraph variant={'body-1'} color={'neutral'}>
                            {category}
                        </Paragraph>
                    </div>
                </div>
                <div className={styles['content-bottom']}>
                    <div className={styles['content-price']}>
                        <Paragraph variant={'body-3'} color={'neutral'}>
                            {'Total Belanja'}
                        </Paragraph>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {formatRupiah(price)}
                        </Paragraph>
                    </div>
                    <div className={styles['content-button']}>
                        {mapButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};

TransactionCard.propTypes = {
    data: PropTypes.object.isRequired,
    variant: PropTypes.string,
};

TransactionCard.defaultProps = {
    data: {
        id: 1,
        name: 'Jam Tangan Casio',
        category: 'Aksesoris',
        price: 200000,
        image: null,
    },
};

export default TransactionCard;
