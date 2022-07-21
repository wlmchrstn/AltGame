import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './navbar.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import Paragraph from '../../components/paragraph/paragraph';
import NavbarModal from '../../components/navbar-modal/navbar-modal';

// Assets
import logo from '../../assets/images/logo.svg';
import search from '../../assets/icons/fi_search.svg';
import user from '../../assets/icons/fi_user.svg';
import bell from '../../assets/icons/fi_bell.svg';
import login from '../../assets/icons/fi_log-in.svg';
import menu from '../../assets/icons/fi_menu.svg';
import store from '../../assets/icons/fi_store.svg';
import shoppingCart from '../../assets/icons/fi_shopping-cart.svg';

// Actions
import { searchProduct } from '../../stores/actions/ActionProduct';
import { logout } from '../../stores/actions/ActionAuth';

const Navbar = () => {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [usercity, setUsercity] = useState('');
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAuth(sessionStorage.getItem('token'));
        }
        if (sessionStorage.getItem('name')) {
            setUsername(sessionStorage.getItem('name'));
        }
        if (sessionStorage.getItem('city')) {
            setUsercity(sessionStorage.getItem('city'));
        }
    }, []);

    useLayoutEffect(() => {
        const updateScreenSize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const handleSearch = async params => {
        dispatch(searchProduct(params.search, navigate));
    };

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    return (
        <section className={styles.root}>
            <div className={styles.wrapper}>
                {screenSize > 767 ? (
                    <>
                        <div className={styles['logo-wrapper']}>
                            <img
                                src={logo}
                                alt={'logo'}
                                onClick={() => navigate('/')}
                            />
                        </div>
                        {window.location.pathname === '/' ||
                        window.location.pathname === '/search' ? (
                            <form onSubmit={handleSubmit(handleSearch)}>
                                <Input className={styles.bg}>
                                    <input
                                        placeholder={'Cari di sini ...'}
                                        {...register('search')}
                                    />
                                    <img src={search} alt={'fi_search'} />
                                </Input>
                            </form>
                        ) : null}
                        {auth ? (
                            <div className={styles['button-group']}>
                                <div
                                    className={styles.button}
                                    onClick={() => navigate('/seller')}
                                >
                                    <img src={store} alt={'fi_store'} />
                                </div>
                                <div
                                    className={styles.button}
                                    onClick={() => console.log('click')}
                                >
                                    <img src={bell} alt={'fi_bell'} />
                                </div>
                                <div
                                    className={styles.button}
                                    onClick={() => setModal(true)}
                                >
                                    <img src={user} alt={'fi_user'} />
                                </div>
                                <NavbarModal
                                    open={modal}
                                    onClose={() => setModal(false)}
                                    className={styles.profile}
                                >
                                    <div
                                        className={styles['profile-detail']}
                                        onClick={() => {
                                            setModal(false);
                                            navigate('/profile');
                                        }}
                                    >
                                        <Paragraph variant={'body-1'}>
                                            {username}
                                        </Paragraph>
                                        <Paragraph variant={'body-1'}>
                                            {usercity}
                                        </Paragraph>
                                    </div>
                                    <hr />
                                    <div
                                        className={
                                            styles['profile-transaction']
                                        }
                                        onClick={() => {
                                            setModal(false);
                                            navigate('/transaction');
                                        }}
                                    >
                                        <Paragraph variant={'body-1'}>
                                            {'Your Transactions'}
                                        </Paragraph>
                                    </div>
                                    <div
                                        className={styles['profile-wishlist']}
                                        onClick={() => {
                                            setModal(false);
                                            navigate('/wishlist');
                                        }}
                                    >
                                        <Paragraph variant={'body-1'}>
                                            {'Your Wishlists'}
                                        </Paragraph>
                                    </div>
                                    <hr />
                                    <div
                                        className={styles['profile-logout']}
                                        onClick={() => {
                                            setModal(false);
                                            handleLogout();
                                        }}
                                    >
                                        <Paragraph variant={'body-1'}>
                                            {'Sign out'}
                                        </Paragraph>
                                    </div>
                                </NavbarModal>
                            </div>
                        ) : (
                            <div className={styles['login-wrapper']}>
                                <Button
                                    variant={'primary'}
                                    onClick={() => navigate('/login')}
                                >
                                    <img src={login} alt={'fi_login'} />
                                    {'Masuk'}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div
                            className={styles.menu}
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            <img src={menu} alt={'fi_menu'} />
                        </div>
                        {window.location.pathname === '/' ||
                        window.location.pathname === '/search' ? (
                            <form onSubmit={handleSubmit(handleSearch)}>
                                <Input className={styles.bg}>
                                    <input
                                        placeholder={'Cari di sini ...'}
                                        {...register('search')}
                                    />
                                    <img src={search} alt={'fi_search'} />
                                </Input>
                            </form>
                        ) : null}
                        <Modal
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                            className={styles.modal}
                        >
                            <div
                                className={classNames(
                                    styles['modal-item'],
                                    styles['modal-home']
                                )}
                                onClick={() => {
                                    navigate('/');
                                    setIsOpen(false);
                                }}
                            >
                                <img src={logo} alt={'fi_logo'} />
                            </div>
                            <div
                                className={styles['modal-item']}
                                onClick={() => {
                                    navigate('/profile');
                                    setIsOpen(false);
                                }}
                            >
                                <img src={user} alt={'fi_user'} />
                                <Paragraph variant={'body-1'}>
                                    {'Profile'}
                                </Paragraph>
                            </div>
                            <hr />
                            <div
                                className={styles['modal-item']}
                                onClick={() => {
                                    navigate('/notification');
                                    setIsOpen(false);
                                }}
                            >
                                <img src={bell} alt={'fi_bell'} />
                                <Paragraph variant={'body-1'}>
                                    {'Notification'}
                                </Paragraph>
                            </div>
                            <hr />
                            <div
                                className={styles['modal-item']}
                                onClick={() => {
                                    navigate('/seller');
                                    setIsOpen(false);
                                }}
                            >
                                <img src={store} alt={'fi_store'} />
                                <Paragraph variant={'body-1'}>
                                    {'Your Product'}
                                </Paragraph>
                            </div>
                            <hr />
                            <div
                                className={styles['modal-item']}
                                onClick={() => {
                                    navigate('/transaction');
                                    setIsOpen(false);
                                }}
                            >
                                <img src={shoppingCart} alt={'fi_cart'} />
                                <Paragraph variant={'body-1'}>
                                    {'Wishlist & Transaction'}
                                </Paragraph>
                            </div>
                        </Modal>
                    </>
                )}
            </div>
        </section>
    );
};

export default Navbar;
