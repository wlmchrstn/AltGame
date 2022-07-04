import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './wishlist-card.module.scss';
import PropTypes from 'prop-types';
import { formatRupiah } from '../../utils/helper';

// Components
import Paragraph from '../paragraph/paragraph';
import Button from '../button/button';

// Assets
import imgcard from '../../assets/images/card-image.png';
import trash from '../../assets/icons/fi_trash.svg';

const WishlistCard = ({ data, ...props }) => {
    const { id, title, category, harga } = data;
    const navigate = useNavigate();

    return (
        <div className={styles.root} {...props}>
            <div className={styles.top}>
                <img src={imgcard} alt={'imgcard'} />
                <div className={styles['content-product']}>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {title}
                    </Paragraph>
                    <Paragraph variant={'body-1'} color={'neutral'}>
                        {category}
                    </Paragraph>
                    <Paragraph variant={'body-1'}>
                        {formatRupiah(harga)}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.bottom}>
                <img src={trash} alt={'fi_trash'} />
                <div>
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() => navigate(`/product/${id}`)}
                    >
                        {'Lihat Halaman Produk'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

WishlistCard.propTypes = {
    data: PropTypes.object.isRequired,
};

WishlistCard.defaultProps = {
    data: {
        id: 1,
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 200000,
    },
};

export default WishlistCard;
