import React from 'react';
import styles from './card.module.scss';
import PropTypes from 'prop-types';

import Paragraph from '../paragraph/paragraph';
import imgcard from '../../assets/images/card-image.png';
import { formatRupiah } from '../../utils/helper';

const Card = ({ data, ...props }) => {
    const { title, category, harga } = data;
    return (
        <div className={styles.root} {...props}>
            <div className={styles.image}>
                <img src={imgcard} alt={'console'} />
            </div>
            <div className={styles.wrapper}>
                <Paragraph className={styles.title} variant={'body-1'}>
                    {title}
                </Paragraph>
                <Paragraph
                    className={styles.category}
                    variant={'body-3'}
                    color={'neutral'}
                >
                    {category}
                </Paragraph>
                <Paragraph className={styles.price} variant={'body-1'}>
                    {formatRupiah(harga)}
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
        title: 'Jam Tangan Casio',
        category: 'Aksesoris',
        harga: 200000,
    },
};

export default Card;
