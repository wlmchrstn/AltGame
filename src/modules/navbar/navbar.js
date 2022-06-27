import React, { useState } from 'react';
import styles from './navbar.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';

// Assets
import logo from '../../assets/images/logo.svg';
import search from '../../assets/icons/fi_search.svg';
import list from '../../assets/icons/fi_list.svg';
import user from '../../assets/icons/fi_user.svg';
import bell from '../../assets/icons/fi_bell.svg';
import login from '../../assets/icons/fi_log-in.svg';
import Modal from '../../components/modal/modal';
import Paragraph from '../../components/paragraph/paragraph';

const Navbar = () => {
    const [auth, setAuth] = useState(false);

    const handleLogin = () => {
        setAuth(!auth);
    };

    return (
        <section className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles['logo-wrapper']}>
                    <img src={logo} alt={'logo'} />
                </div>
                <Input className={styles.bg}>
                    <input placeholder={'Cari di sini ...'} />
                    <img src={search} alt={'fi_search'} />
                </Input>
                {auth ? (
                    <div className={styles['button-group']}>
                        <div
                            className={styles.button}
                            onClick={() => handleLogin}
                        >
                            <img src={list} alt={'fi_list'} />
                        </div>
                        <div
                            className={styles.button}
                            onClick={() => handleLogin}
                        >
                            <img src={bell} alt={'fi_bell'} />
                        </div>
                        <div
                            className={styles.button}
                            onClick={() => handleLogin}
                        >
                            <img src={user} alt={'fi_user'} />
                            <Modal>
                                <Paragraph
                                    className={styles['modal-header']}
                                    variant={'body-1'}
                                    color={'grey'}
                                >
                                    Penawaran Produk
                                </Paragraph>
                                <Paragraph
                                    className={styles['modal-header']}
                                    variant={'body-1'}
                                    weight={'medium'}
                                >
                                    Jam Tangan Casio
                                </Paragraph>
                                <Paragraph
                                    className={styles['modal-header']}
                                    variant={'body-1'}
                                    weight={'medium'}
                                >
                                    Rp 250.000
                                </Paragraph>
                                <Paragraph
                                    className={styles['modal-header']}
                                    variant={'body-1'}
                                    weight={'medium'}
                                >
                                    Berhasil Ditawar Rp 200.000
                                </Paragraph>
                                <Paragraph
                                    className={styles['modal-header']}
                                    variant={'body-1'}
                                    color={'grey'}
                                >
                                    Kamu akan segera dihubungi penjual via
                                    whatsapp
                                </Paragraph>
                                <div className={styles['nav-modal']}></div>
                            </Modal>
                        </div>
                    </div>
                ) : (
                    <div className={styles['login-wrapper']}>
                        <Button variant={'primary'} onClick={() => handleLogin}>
                            <img src={login} alt={'fi_login'} />
                            {'Masuk'}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Navbar;
