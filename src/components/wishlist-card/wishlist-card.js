import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './wishlist-card.module.scss';
import PropTypes from 'prop-types';
import { formatRupiah } from '../../utils/helper';
import { useDispatch } from 'react-redux/es/exports';

// Components
import Paragraph from '../paragraph/paragraph';
import Button from '../button/button';

// Assets
import trash from '../../assets/icons/fi_trash.svg';

// Actions
import { deleteWishlist } from '../../stores/actions/ActionWishlist';

const WishlistCard = ({ data, notification, refresh, ...props }) => {
    const { product, wishlistId } = data;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mapCategoryId = params => {
        switch (params) {
            case 1:
                return 'Console';
            case 2:
                return 'Video Game';
            case 3:
                return 'Controller';
            case 4:
                return 'Aksesoris';
            case 5:
                return 'Board Game';
            case 6:
                return 'Collectible';
            case 7:
                return 'Other';
            default:
                return 'Other';
        }
    };

    return (
        <div className={styles.root} {...props}>
            <div className={styles.top}>
                <img src={product.image} alt={'imgcard'} />
                <div className={styles['content-product']}>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {product.name}
                    </Paragraph>
                    <Paragraph variant={'body-1'} color={'neutral'}>
                        {mapCategoryId(product.categoryId)}
                    </Paragraph>
                    <Paragraph variant={'body-1'}>
                        {formatRupiah(product.price)}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.bottom}>
                <img
                    onClick={() =>
                        dispatch(
                            deleteWishlist(
                                wishlistId,
                                notification,
                                refresh,
                                navigate
                            )
                        )
                    }
                    src={trash}
                    alt={'fi_trash'}
                />
                <div>
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() =>
                            navigate(`/product/${product.productId}`)
                        }
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
    notification: PropTypes.func,
    refresh: PropTypes.func,
};

WishlistCard.defaultProps = {
    data: {},
    notification: null,
    refresh: null,
};

export default WishlistCard;
