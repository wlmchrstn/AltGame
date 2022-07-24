import React from 'react';
import styles from './card.module.scss';
import PropTypes from 'prop-types';

import Paragraph from '../paragraph/paragraph';
import { formatRupiah } from '../../utils/helper';

const Card = ({ data, ...props }) => {
    const { name, category, categoryId, price, image } = data;

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
                return params;
        }
    };

    return (
        <div className={styles.root} {...props}>
            <div className={styles.image}>
                <img src={image} alt={'console'} />
            </div>
            <div className={styles.wrapper}>
                <Paragraph className={styles.title} variant={'body-1'}>
                    {name}
                </Paragraph>
                <Paragraph
                    className={styles.category}
                    variant={'body-3'}
                    color={'neutral'}
                >
                    {mapCategoryId(category || categoryId)}
                </Paragraph>
                <Paragraph className={styles.price} variant={'body-1'}>
                    {formatRupiah(price)}
                </Paragraph>
            </div>
        </div>
    );
};

Card.propTypes = {
    data: PropTypes.object.isRequired,
};

Card.defaultProps = {
    data: {
        id: 1,
        name: 'Jam Tangan Casio',
        category: 'Aksesoris',
        price: 200000,
    },
};

export default Card;
