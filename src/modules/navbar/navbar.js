import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './navbar.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import Paragraph from '../../components/paragraph/paragraph';
import NavbarModal from '../../components/navbar-modal/navbar-modal';
import Title from '../../components/title/title';
import Spinner from '../../components/spinner/spinner';

// Assets
import logo from '../../assets/images/alt.game.svg';
import search from '../../assets/icons/fi_search.svg';
import user from '../../assets/icons/fi_user.svg';
import bell from '../../assets/icons/fi_bell.svg';
import bellOn from '../../assets/icons/fi_bell-on.svg';
import login from '../../assets/icons/fi_log-in.svg';
import menu from '../../assets/icons/fi_menu.svg';
import store from '../../assets/icons/fi_store.svg';
import shoppingCart from '../../assets/icons/fi_shopping-cart.svg';
import heart from '../../assets/icons/fi_heart.svg';

// Actions
import { searchProduct } from '../../stores/actions/ActionProduct';
import { logout } from '../../stores/actions/ActionAuth';
import { getAllNotif, updateNotif } from '../../stores/actions/ActionNotif';

const Navbar = () => {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [usercity, setUsercity] = useState('');
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [notifModal, setNotifModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [newBell, setNewBell] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { listNotifs, loading } = useSelector(state => state.ReducerNotif);

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

    useEffect(() => {
        dispatch(getAllNotif(setNewBell, navigate));
    }, [dispatch, refresh]);

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

    const mapNotif = data => {
        if (data.length === 0)
            return (
                <div style={{ margin: '0 16px' }}>{'Belum ada notifikasi'}</div>
            );

        const newNotif = data.filter(item => {
            return item.status === 'unread';
        });

        const oldNotif = data.filter(item => {
            return item.status === 'read';
        });

        return (
            <>
                {newNotif.length !== 0 ? (
                    <>
                        <Title
                            tagElement={'h3'}
                            variant={'title-1'}
                            weight={'bold'}
                        >
                            {'Baru'}
                        </Title>
                        {newNotif.map((value, index) => {
                            return (
                                <div
                                    className={classNames(
                                        styles['notif-item'],
                                        styles['notif-new']
                                    )}
                                    key={index}
                                    onClick={() =>
                                        dispatch(
                                            updateNotif(
                                                value.notificationId,
                                                setRefresh,
                                                navigate
                                            )
                                        )
                                    }
                                >
                                    <Paragraph variant={'body-1'}>
                                        {`Penawaranmu atas produk '${value.productName}' telah diterima oleh penjual, silahkan lanjutkan tahap pembayaran`}
                                    </Paragraph>
                                </div>
                            );
                        })}
                    </>
                ) : null}
                {oldNotif.length !== 0 ? (
                    <>
                        <Title
                            tagElement={'h3'}
                            variant={'title-1'}
                            weight={'bold'}
                        >
                            {'Terdahulu'}
                        </Title>
                        {oldNotif.map((value, index) => {
                            return (
                                <div
                                    className={classNames(
                                        styles['notif-item'],
                                        styles['notif-old']
                                    )}
                                    key={index}
                                >
                                    <Paragraph variant={'body-1'}>
                                        {`Penawaranmu atas produk '${value.productName}' telah diterima oleh penjual, silahkan lanjutkan tahap pembayaran`}
                                    </Paragraph>
                                </div>
                            );
                        })}
                    </>
                ) : null}
            </>
        );
    };

    return (
        <section className={styles.root}>
            <div className={styles.wrapper}>
                {screenSize > 767 ? (
                    <>
                        <div className={styles['logo-wrapper']}>
                            <img
                                className={styles['alt-game']}
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
                                    onClick={() => setNotifModal(true)}
                                >
                                    {newBell ? (
                                        <img src={bellOn} alt={'fi_bell-on'} />
                                    ) : (
                                        <img src={bell} alt={'fi_bell-on'} />
                                    )}
                                </div>
                                <NavbarModal
                                    open={notifModal}
                                    onClose={() => setNotifModal(false)}
                                    className={styles.notif}
                                >
                                    {loading ? (
                                        <Spinner variant={'page'} />
                                    ) : (
                                        mapNotif(listNotifs)
                                    )}
                                </NavbarModal>
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
                                <img
                                    className={styles['alt-game']}
                                    src={logo}
                                    alt={'fi_logo'}
                                />
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
                                    {'Transaction'}
                                </Paragraph>
                            </div>
                            <hr />
                            <div
                                className={styles['modal-item']}
                                onClick={() => {
                                    navigate('/wishlist');
                                    setIsOpen(false);
                                }}
                            >
                                <img src={heart} alt={'fi_cart'} />
                                <Paragraph variant={'body-1'}>
                                    {'Wishlist'}
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
