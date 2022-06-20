import React from 'react';
import styles from './card.module.scss';
import PropTypes from 'prop-types';

import Title from '../title/title';
import imgcard from '../../assets/images/card-image.png';

const Card = ({ title }) => {
    const handleTitle = title ? title : '';
    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={imgcard} alt={'console'} />
            </div>
            <div className={styles.wrapper}>
                <Title tagElement={'h2'}>{handleTitle}</Title>
                <p>{'Aksesoris'}</p>
                <Title tagElement={'h2'}>{'Rp 250.000'}</Title>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
};

Card.defaultProps = {
    children: '',
    variant: 'primary',
    color: '',
    type: 'button',
    withIcon: '',
};

export default Card;

// import React from 'react';
// import styles from './card.module.scss';
// import { useNavigate } from 'react-router-dom';

// import Title from '../title/title';

// const card = ({ name, category, price, image }) => {
//     const navigate = useNavigate();
//     return (
//         <div className={styles.root}>
//             <div className={styles.image}>
//                 <img src={image} alt={'console'} />
//             </div>
//             <div className={styles.wrapper}>
//                 <Title tagElement={'h2'}>{'${name}'}</Title>
//                 <p>{'${category}'}</p>
//                 <Title tagElement={'h2'}>{'${formatRupiah(price)}'}</Title>
//             </div>
//         </div>
//     );
// };

// export default card;
