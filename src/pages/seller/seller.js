import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './seller.module.scss';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Card from '../../components/card/card';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';
import Modal from '../../components/modal/modal';
import Input from '../../components/input/input';

// Assets
import profileImg from '../../assets/images/userplaceholder.png';
import iconEmpty from '../../assets/icons/fi_empty.svg';
import iconBoxGrey from '../../assets/icons/fi_box_grey.svg';
import iconBoxPurple from '../../assets/icons/fi_box_purple.svg';
import iconBoxWhite from '../../assets/icons/fi_box_white.svg';
import iconHeartGrey from '../../assets/icons/fi_heart_grey.svg';
import iconHeartPurple from '../../assets/icons/fi_heart_purple.svg';
import iconHeartWhite from '../../assets/icons/fi_heart_white.svg';
import iconDollarGrey from '../../assets/icons/fi_dollar_grey.svg';
import iconDollarPurple from '../../assets/icons/fi_dollar_purple.svg';
import iconDollarWhite from '../../assets/icons/fi_dollar_white.svg';
import iconChevronGreyR from '../../assets/icons/fi_chevron_r_gray.svg';
import iconChevronPurpleR from '../../assets/icons/fi_chevron_r_purple.svg';
import iconPlus from '../../assets/icons/fi_plus.svg';

// Modules
import SellerCreate from '../../modules/seller-create/seller-create';
import SellerBid from '../../modules/seller-bid/seller-bid';

// Actions
import { getSellerProduct } from '../../stores/actions/ActionSeller';
import { getUser, registerSeller } from '../../stores/actions/ActionAuth';

export const SellerPage = () => {
    const [filter, setFilter] = useState('semua');
    const [page, setPage] = useState('landing');
    const [notification, setNotification] = useState(false);
    const [productId, setProductId] = useState(null);
    const [screenSize, setScreenSize] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [registerRefresh, setRegisterRefresh] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { listProducts, loading, message, messageStatus } = useSelector(
        state => state.ReducerSeller
    );
    const { user, buttonLoading } = useSelector(state => state.ReducerAuth);
    const userLoading = useSelector(state => state.ReducerAuth.loading);
    const [sellerForm, setSellerForm] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useLayoutEffect(() => {
        const updateScreenSize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, registerRefresh]);

    useEffect(() => {
        dispatch(getSellerProduct());
    }, [dispatch, refresh, registerRefresh]);

    const handleCard = async params => {
        setProductId(params);
        setPage('bid');
    };

    const handleMapping = params => {
        if (params === []) return null;
        return params.map((value, index) => {
            return (
                <Card
                    key={index}
                    data={value}
                    onClick={() => handleCard(value.productId)}
                />
            );
        });
    };

    const handleBidded = params => {
        const bidded = params.filter(item => {
            return item.status == 'bidded';
        });

        if (bidded.length == 0) {
            return (
                <div className={styles['product-empty']}>
                    <div className={styles.empty}>
                        <img src={iconEmpty} alt={'icon-empty'} />
                        <Paragraph
                            className={styles['empty-text']}
                            variant={'body-1'}
                            color={'black'}
                            weight={'medium'}
                        >
                            {'Belum ada produkmu yang diminati nih,'}
                            <br />
                            {'sabar ya rejeki nggak kemana kok'}
                        </Paragraph>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.product}>
                    {bidded.map((value, index) => {
                        return (
                            <Card
                                key={index}
                                data={value}
                                onClick={() => handleCard(value.productId)}
                            />
                        );
                    })}
                </div>
            );
        }
    };

    const handleHistory = params => {
        const sold = params.filter(item => {
            return item.status == 'sold' || item.status == 'waiting';
        });

        if (sold.length == 0) {
            return (
                <div className={styles['product-empty']}>
                    <div className={styles.empty}>
                        <img src={iconEmpty} alt={'icon-empty'} />
                        <Paragraph
                            className={styles['empty-text']}
                            variant={'body-1'}
                            color={'black'}
                            weight={'medium'}
                        >
                            {'Belum ada produkmu yang terjual nih,'}
                            <br />
                            {'sabar ya rejeki nggak kemana kok'}
                        </Paragraph>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.product}>
                    {sold.map((value, index) => {
                        return (
                            <Card
                                key={index}
                                data={value}
                                onClick={() => handleCard(index)}
                            />
                        );
                    })}
                </div>
            );
        }
    };

    const handleJadiSeller = params => {
        dispatch(
            registerSeller(
                params,
                setSellerForm,
                setNotification,
                setRegisterRefresh,
                navigate
            )
        );
    };

    if (userLoading)
        return (
            <section className={styles.root}>
                <Spinner variant={'page'} />
            </section>
        );

    if (user.role === 'buyer')
        return (
            <section className={styles.buyer}>
                <Title tagElement={'h1'} variant={'heading-2'} weight={'bold'}>
                    {'Mau berjualan di AltGame?'}
                    <br />
                    {'Yuk daftar jadi Seller di AltGame'}
                </Title>
                <Modal
                    open={sellerForm}
                    onClose={() => setSellerForm(false)}
                    className={styles.modal}
                >
                    <form onSubmit={handleSubmit(handleJadiSeller)}>
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Bank Account'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                {...register('bankAccount', { required: true })}
                                placeholder={'Bank Account'}
                                type={'text'}
                            />
                        </Input>
                        {errors.bankAccount &&
                            errors.bankAccount.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        <Button variant={'primary'} type={'submit'}>
                            {buttonLoading ? (
                                <Spinner variant={'button'} />
                            ) : (
                                'Daftar'
                            )}
                        </Button>
                    </form>
                </Modal>
                <Button
                    variant={'primary'}
                    type={'button'}
                    onClick={() => setSellerForm(true)}
                >
                    {'Daftar disini'}
                </Button>
            </section>
        );

    return (
        <section className={styles.root}>
            {page === 'landing' ? (
                <>
                    <Notification
                        message={message}
                        variant={messageStatus}
                        show={notification}
                        setShow={setNotification}
                    />
                    <div className={styles.header}>
                        <Title
                            tagElement={'h2'}
                            variant={'heading-2'}
                            color={'black'}
                            weight={'bold'}
                        >
                            {'Daftar Jual Saya'}
                        </Title>
                    </div>
                    <div className={styles.seller}>
                        {user.image ? (
                            <img
                                className={styles['seller-image']}
                                src={`data:image/jpeg;base64,${user.image}`}
                                alt={'profile-image'}
                            />
                        ) : (
                            <img
                                className={styles['seller-image']}
                                src={profileImg}
                                alt={'profile-image'}
                            />
                        )}
                        <div className={styles['seller-detail']}>
                            <Paragraph
                                className={styles['seller-name']}
                                variant={'body-1'}
                                color={'black'}
                                weight={'medium'}
                            >
                                {user.name}
                            </Paragraph>
                            <Paragraph
                                className={styles['seller-city']}
                                variant={'body-3'}
                                color={'neutral'}
                            >
                                {user.city || ''}
                            </Paragraph>
                        </div>
                        <Button
                            type={'button'}
                            variant={'secondary'}
                            className={styles.button}
                            onClick={() => navigate('/profile')}
                        >
                            <Paragraph variant={'body-2'} weight={'medium'}>
                                {'Edit'}
                            </Paragraph>
                        </Button>
                    </div>
                    <div className={styles.content}>
                        {screenSize > 767 ? (
                            <div className={styles.category}>
                                <Title
                                    tagElement={'h3'}
                                    variant={'title-2'}
                                    color={'black'}
                                    weight={'medium'}
                                >
                                    {'Kategori'}
                                </Title>
                                <div className={styles['category-wrapper']}>
                                    <div
                                        className={classNames(
                                            filter === 'semua'
                                                ? styles.selected
                                                : styles.border,
                                            styles.item
                                        )}
                                        onClick={() => setFilter('semua')}
                                    >
                                        <img
                                            className={styles['icon-left']}
                                            src={
                                                filter === 'semua'
                                                    ? iconBoxPurple
                                                    : iconBoxGrey
                                            }
                                            alt={'box-icon'}
                                        />
                                        <Title
                                            className={styles['item-name']}
                                            tagElement={'h4'}
                                            variant={'title-2'}
                                            weight={'medium'}
                                            color={
                                                filter === 'semua'
                                                    ? 'purple'
                                                    : 'black'
                                            }
                                        >
                                            {'Semua Produk'}
                                        </Title>
                                        <img
                                            className={styles['icon-right']}
                                            src={
                                                filter === 'semua'
                                                    ? iconChevronPurpleR
                                                    : iconChevronGreyR
                                            }
                                            alt={'chevron-icon'}
                                        />
                                    </div>
                                    <div
                                        className={classNames(
                                            filter === 'diminati'
                                                ? styles.selected
                                                : styles.border,
                                            styles.item
                                        )}
                                        onClick={() => setFilter('diminati')}
                                    >
                                        <img
                                            className={styles['icon-left']}
                                            src={
                                                filter === 'diminati'
                                                    ? iconHeartPurple
                                                    : iconHeartGrey
                                            }
                                            alt={'box-heart'}
                                        />
                                        <Title
                                            className={styles['item-name']}
                                            tagElement={'h4'}
                                            variant={'title-2'}
                                            weight={'medium'}
                                            color={
                                                filter === 'diminati'
                                                    ? 'purple'
                                                    : 'black'
                                            }
                                        >
                                            {'Diminati'}
                                        </Title>
                                        <img
                                            className={styles['icon-right']}
                                            src={
                                                filter === 'diminati'
                                                    ? iconChevronPurpleR
                                                    : iconChevronGreyR
                                            }
                                            alt={'chevron-icon'}
                                        />
                                    </div>
                                    <div
                                        className={styles.item}
                                        onClick={() => setFilter('history')}
                                    >
                                        <img
                                            className={styles['icon-left']}
                                            src={
                                                filter === 'history'
                                                    ? iconDollarPurple
                                                    : iconDollarGrey
                                            }
                                            alt={'box-dollar'}
                                        />
                                        <Title
                                            className={styles['item-name']}
                                            tagElement={'h4'}
                                            variant={'title-2'}
                                            weight={'medium'}
                                            color={
                                                filter === 'history'
                                                    ? 'purple'
                                                    : 'black'
                                            }
                                        >
                                            {'History'}
                                        </Title>
                                        <img
                                            className={styles['icon-right']}
                                            src={
                                                filter === 'history'
                                                    ? iconChevronPurpleR
                                                    : iconChevronGreyR
                                            }
                                            alt={'chevron-icon'}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.category}>
                                <Button
                                    type={'button'}
                                    variant={
                                        filter === 'semua'
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    onClick={() => setFilter('semua')}
                                >
                                    <img
                                        className={styles.icon}
                                        src={
                                            filter === 'semua'
                                                ? iconBoxWhite
                                                : iconBoxGrey
                                        }
                                        alt="logo-search-white"
                                    />
                                    {'Semua'}
                                </Button>
                                <Button
                                    type={'button'}
                                    variant={
                                        filter === 'diminati'
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    onClick={() => setFilter('diminati')}
                                >
                                    <img
                                        className={styles.icon}
                                        src={
                                            filter === 'diminati'
                                                ? iconHeartWhite
                                                : iconHeartGrey
                                        }
                                        alt="logo-search"
                                    />
                                    {'Diminati'}
                                </Button>
                                <Button
                                    type={'button'}
                                    variant={
                                        filter === 'history'
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    onClick={() => setFilter('history')}
                                >
                                    <img
                                        className={styles.icon}
                                        src={
                                            filter === 'history'
                                                ? iconDollarWhite
                                                : iconDollarGrey
                                        }
                                        alt="logo-search"
                                    />
                                    {'History'}
                                </Button>
                            </div>
                        )}
                        {filter === 'semua' ? (
                            <div className={styles.product}>
                                <div
                                    className={styles['product-add']}
                                    onClick={() => setPage('create')}
                                >
                                    <img src={iconPlus} alt={'fi_plus'} />
                                    <Paragraph
                                        variant={'body-2'}
                                        color={'neutral'}
                                    >
                                        {'Tambah Produk'}
                                    </Paragraph>
                                </div>
                                {loading ? (
                                    <Spinner variant={'page'} />
                                ) : (
                                    handleMapping(listProducts)
                                )}
                            </div>
                        ) : filter === 'diminati' ? (
                            handleBidded(listProducts)
                        ) : filter === 'history' ? (
                            handleHistory(listProducts)
                        ) : null}
                    </div>
                </>
            ) : page === 'create' ? (
                <SellerCreate
                    handleCreate={setPage}
                    handleNotification={setNotification}
                    setRefresh={setRefresh}
                />
            ) : page === 'bid' ? (
                <SellerBid
                    productId={productId}
                    handleBid={setPage}
                    handleNotification={setNotification}
                    setRefresh={setRefresh}
                />
            ) : null}
        </section>
    );
};

export default SellerPage;
