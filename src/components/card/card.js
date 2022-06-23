import React from 'react';
import styles from './card.module.scss';
import PropTypes from 'prop-types';

import Paragraph from '../paragraph/paragraph';
import imgcard from '../../assets/images/card-image.png';

const Card = ({ title, ...props }) => {
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
                    color={'grey'}
                >
                    {'Aksesoris'}
                </Paragraph>
                <Paragraph className={styles.price} variant={'body-1'}>
                    {'Rp 250.000'}
                </Paragraph>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
};

Card.defaultProps = {
    title: 'Jam Tangan Casio',
};

export default Card;
