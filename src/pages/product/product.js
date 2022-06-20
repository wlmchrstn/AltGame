import React from 'react';
// import { useParams } from 'react-router-dom';
import styles from './product.module.scss';
import imgPlaceholder from '../../assets/images/login-bg.png';
import Button from '../../components/button/button';

const ProductPage = () => {
    // const { id } = useParams();
    return (
        <section className={styles.root}>
            <div className={styles.left}>
                <div className={styles.carousel}></div>
                <div className={styles.desc}>
                    <p className={styles['desc-header']}>Deskripsi</p>
                    <p className={styles['desc-body']}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.product}>
                    <p>Jam Tangan Casio</p>
                    <p>Aksesoris</p>
                    <p>Rp 250.000</p>
                    <Button type={'button'} variant={'primary'}>
                        Saya tertarik dan ingin nego
                    </Button>
                </div>
                <div className={styles.seller}>
                    <img
                        className={styles['seller-image']}
                        src={imgPlaceholder}
                        alt={'seller-image'}
                    />
                    <div className={styles['seller-detail']}>
                        <p>Nama Penjual</p>
                        <p>Kota</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
