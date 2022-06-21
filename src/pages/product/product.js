import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './product.module.scss';

// Components
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import Input from '../../components/input/input';

// Assets
import imgPlaceholder from '../../assets/images/login-bg.png';

const ProductPage = () => {
    // const { id } = useParams();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleTawar = data => {
        console.log(data);
    };

    return (
        <section className={styles.root}>
            <div className={styles.left}>
                <div className={styles.carousel}>
                    <img src={imgPlaceholder} alt={'placeholder'} />
                </div>
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
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={handleClick}
                    >
                        Saya tertarik dan ingin nego
                    </Button>
                    <Modal
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className={styles.modal}
                    >
                        <p>Masukkan Harga Tawarmu</p>
                        <p>
                            Harga tawaranmu akan diketahui penual, jika penjual
                            cocok kamu akan segera dihubungi penjual.
                        </p>
                        <div className={styles['product-summary']}>
                            <img
                                className={styles['product-image']}
                                src={imgPlaceholder}
                                alt={'seller-image'}
                            />
                            <div className={styles['product-detail']}>
                                <p>Jam Tangan Casio</p>
                                <p>Rp 250.000</p>
                            </div>
                        </div>
                        <p>Harga Tawar</p>
                        <form onSubmit={handleSubmit(handleTawar)}>
                            <Input>
                                <input
                                    type={'number'}
                                    placeholder={'Rp 0,00'}
                                    {...register('harga', { required: true })}
                                />
                                {errors.harga &&
                                    errors.harga.type === 'required' && (
                                        <p className={styles.error}>
                                            *Required field*
                                        </p>
                                    )}
                            </Input>
                            <Button type={'submit'} variant={'primary'}>
                                Kirim
                            </Button>
                        </form>
                    </Modal>
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
