import React from 'react';
import styles from './transaction-card.module.scss';
import PropTypes from 'prop-types';
import { formatRupiah } from '../../utils/helper';

// Components
import Paragraph from '../paragraph/paragraph';
import Button from '../button/button';

// Assets
import shoppingBag from '../../assets/icons/fi_shopping-bag.svg';
import imgcard from '../../assets/images/card-image.png';

const TransactionCard = ({ data, variant, ...props }) => {
    const { title, category, harga } = data;

    return (
        <div className={styles.root} {...props}>
            <div className={styles.header}>
                <img src={shoppingBag} alt={'fi_shopping-bag'} />
                <div className={styles['header-content']}>
                    <div className={styles['header-detail']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {'Belanja'}
                        </Paragraph>
                        <Paragraph variant={'body-3'} color={'neutral'}>
                            {'1 Juni 2022'}
                        </Paragraph>
                    </div>
                    <Paragraph className={styles[variant]} variant={'body-1'}>
                        {variant}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles['content-top']}>
                    <img src={imgcard} alt={'imgcard'} />
                    <div className={styles['content-product']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {title}
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
                            {formatRupiah(harga)}
                        </Paragraph>
                    </div>
                    <div className={styles['content-button']}>
                        <Button
                            variant={'primary'}
                            onClick={() => console.log('button')}
                        >
                            {'Detail'}
                        </Button>
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
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 200000,
    },
    variant: 'berlangsung',
};

export default TransactionCard;
