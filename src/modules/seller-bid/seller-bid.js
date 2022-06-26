import React from 'react';
import PropTypes from 'prop-types';
import styles from './seller-bid.module.scss';
import { formatRupiah } from '../../utils/helper';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import imgPlaceholder from '../../assets/images/card-image.png';

const Bid = ({ data }) => {
    const { name, harga, status } = data;
    return (
        <div className={styles['bid-wrapper']}>
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
                        <Button type={'button'} variant={'primary'}>
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
            return <Bid data={value} key={index} />;
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
};

Bid.defaultProps = {
    data: {},
};

SellerBid.propTypes = {
    product: PropTypes.object,
    bid: PropTypes.object,
    handleBid: PropTypes.func,
};

SellerBid.defaultProps = {
    product: {},
    bid: {},
    handleBid: null,
};

export default SellerBid;
