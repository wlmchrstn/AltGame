import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './seller.module.scss';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Card from '../../components/card/card';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';

// Assets
import profileImg from '../../assets/images/profile-image.png';
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

export const SellerPage = () => {
    const [filter, setFilter] = useState('semua');
    const [page, setPage] = useState('landing');
    const [notification, setNotification] = useState(false);
    const [productId, setProductId] = useState(null);
    const [screenSize, setScreenSize] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { listProducts, loading, message, messageStatus } = useSelector(
        state => state.ReducerSeller
    );
    const { user } = useSelector(state => state.ReducerAuth);

    useLayoutEffect(() => {
        const updateScreenSize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    useEffect(() => {
        dispatch(getSellerProduct(navigate));
    }, [dispatch, refresh]);

    const handleCard = async params => {
        console.log(listProducts[params].productId);
        setProductId(listProducts[params].productId);
        setPage('bid');
    };

    const handleMapping = params => {
        if (params === []) return null;
        return params.map((value, index) => {
            return (
                <Card
                    key={index}
                    data={value}
                    onClick={() => handleCard(index)}
                />
            );
        });
    };

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
                        <img
                            className={styles['seller-image']}
                            src={profileImg}
                            alt={'profile-image'}
                        />
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
                                {user.city || 'Batam'}
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
                                        onClick={() => setFilter('terjual')}
                                    >
                                        <img
                                            className={styles['icon-left']}
                                            src={
                                                filter === 'terjual'
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
                                                filter === 'terjual'
                                                    ? 'purple'
                                                    : 'black'
                                            }
                                        >
                                            {'Terjual'}
                                        </Title>
                                        <img
                                            className={styles['icon-right']}
                                            src={
                                                filter === 'terjual'
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
                                        filter === 'terjual'
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    onClick={() => setFilter('terjual')}
                                >
                                    <img
                                        className={styles.icon}
                                        src={
                                            filter === 'terjual'
                                                ? iconDollarWhite
                                                : iconDollarGrey
                                        }
                                        alt="logo-search"
                                    />
                                    {'Terjual'}
                                </Button>
                            </div>
                        )}
                        <div
                            className={
                                filter === 'semua'
                                    ? styles.product
                                    : styles['product-empty']
                            }
                        >
                            {filter === 'semua' ? (
                                <>
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
                                </>
                            ) : filter === 'diminati' ? (
                                <div className={styles.empty}>
                                    <img src={iconEmpty} alt={'icon-empty'} />
                                    <Paragraph
                                        className={styles['empty-text']}
                                        variant={'body-1'}
                                        color={'black'}
                                        weight={'medium'}
                                    >
                                        {
                                            'Belum ada produkmu yang diminati nih,'
                                        }
                                        <br />
                                        {'sabar ya rejeki nggak kemana kok'}
                                    </Paragraph>
                                </div>
                            ) : filter === 'terjual' ? (
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
                            ) : null}
                        </div>
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
