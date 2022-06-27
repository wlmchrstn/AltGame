import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './seller-bid.module.scss';
import { formatRupiah } from '../../utils/helper';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Notification from '../../components/notification/notification';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import imgPlaceholder from '../../assets/images/card-image.png';
import Modal from '../../components/modal/modal';

const Bid = ({ data, product }) => {
    const { name, harga, status } = data;
    const { title, harga: price } = product;
    const [notification, setNotification] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles['bid-wrapper']}>
            <Notification
                message={'Harga tawarmu berhasil dikirim ke penjual'}
                variant={'success'}
                show={notification}
                setShow={setNotification}
            />
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <Paragraph variant={'body-1'} weight={'medium'}>
                    {'Yeay kamu berhasil mendapat harga yang sesuai'}
                </Paragraph>
                <Paragraph variant={'body-1'} color={'neutral'}>
                    {'Silahkan menunggu pembeli melanjutkan pembayaran'}
                </Paragraph>
                <div className={styles['modal-match']}>
                    <Paragraph
                        className={styles['modal-header']}
                        variant={'body-1'}
                        weight={'medium'}
                    >
                        {'Product Match'}
                    </Paragraph>
                    <div className={styles['modal-wrapper']}>
                        <img src={imgPlaceholder} alt={'placeholder'} />
                        <div className={styles['modal-detail']}>
                            <Paragraph variant={'body-1'}>{name}</Paragraph>
                            <Paragraph variant={'body-3'}>{'Kota'}</Paragraph>
                        </div>
                    </div>
                    <div className={styles['modal-wrapper']}>
                        <img src={imgPlaceholder} alt={'placeholder'} />
                        <div className={styles['modal-product']}>
                            <Paragraph variant={'body-1'}>{title}</Paragraph>
                            <Paragraph
                                className={styles['line-through']}
                                variant={'body-1'}
                            >
                                {formatRupiah(price)}
                            </Paragraph>
                            <Paragraph variant={'body-1'}>
                                {`Ditawar ${formatRupiah(harga)}`}
                            </Paragraph>
                        </div>
                    </div>
                </div>
                <Button variant={'primary'} onClick={() => setIsOpen(false)}>
                    {'Hubungi via Whatsapp'}
                </Button>
            </Modal>
            <div className={styles.user}>
                <img src={imgPlaceholder} alt={'placeholder'} />
                <div className={styles['user-detail']}>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {name}
                    </Paragraph>
                    <Paragraph variant={'body-1'} color={'neutral'}>
                        {'Kota'}
                    </Paragraph>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {formatRupiah(harga)}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.button}>
                {status === 'pending' ? (
                    <>
                        <Button type={'button'} variant={'secondary'}>
                            {'Tolak'}
                        </Button>
                        <Button
                            type={'button'}
                            variant={'primary'}
                            onClick={() => setIsOpen(true)}
                        >
                            {'Terima'}
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

const SellerBid = ({ product, bid, handleBid }) => {
    const { title, category, harga } = product;

    const mapTawar = params => {
        return params.map((value, index) => {
            return <Bid data={value} product={product} key={index} />;
        });
    };

    return (
        <div className={styles.root}>
            <img
                src={arrowLeft}
                alt={'fi_arrow-left'}
                onClick={() => handleBid('landing')}
            />
            <div className={styles.container}>
                <div className={styles.product}>
                    <img
                        className={styles['product-image']}
                        src={imgPlaceholder}
                        alt={'placeholder'}
                    />
                    <div className={styles['product-detail']}>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {title}
                        </Paragraph>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {category}
                        </Paragraph>
                        <Paragraph variant={'body-1'} color={'black'}>
                            {formatRupiah(harga)}
                        </Paragraph>
                    </div>
                </div>
                <Title
                    className={styles.header}
                    tagElement={'h2'}
                    variant={'title-1'}
                    weight={'bold'}
                >
                    {'Daftar Penawar'}
                </Title>
                <div className={styles.bid}>{mapTawar(bid)}</div>
            </div>
        </div>
    );
};

Bid.propTypes = {
    data: PropTypes.object,
    product: PropTypes.object,
};

Bid.defaultProps = {
    data: {},
    product: {},
};

SellerBid.propTypes = {
    product: PropTypes.object,
    bid: PropTypes.arrayOf(PropTypes.object),
    handleBid: PropTypes.func,
};

SellerBid.defaultProps = {
    product: {},
    bid: [],
    handleBid: null,
};

export default SellerBid;
