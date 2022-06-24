import React, { useState } from 'react';
import styles from './seller.module.scss';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Card from '../../components/card/card';

// Assets
import profileImg from '../../assets/images/profile-image.png';
import iconEmpty from '../../assets/icons/fi_empty.svg';
import iconBoxGrey from '../../assets/icons/fi_box_grey.svg';
import iconBoxPurple from '../../assets/icons/fi_box_purple.svg';
import iconHeartGrey from '../../assets/icons/fi_heart_grey.svg';
import iconHeartPurple from '../../assets/icons/fi_heart_purple.svg';
import iconDollarGrey from '../../assets/icons/fi_dollar_grey.svg';
import iconDollarPurple from '../../assets/icons/fi_dollar_purple.svg';
import iconChevronGreyR from '../../assets/icons/fi_chevron_r_gray.svg';
import iconChevronPurpleR from '../../assets/icons/fi_chevron_r_purple.svg';

export const SellerPage = () => {
    const [filter, setFilter] = useState('semua');
    // const [filterProduk, setProduk] = useState('produk');
    // const [filterDiminati, setDiminati] = useState('diminati');
    // const [filterTerjual, setTerjual] = useState('terjual');
    const [page, setPage] = useState(1);

    const dataMock = [
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
        'Jam Tangan Casio',
    ];

    const handleMapping = () => {
        return dataMock.map((value, index) => {
            console.log(value);
            return <Card key={index} title={value}></Card>;
        });
    };

    const renderPage = () => {
        console.log(page);
        if (page == 1) {
            return (
                <div className={styles['semua-produk']}>{handleMapping()}</div>
            );
        } else if (page == 2) {
            return (
                <div className={styles.diminati}>
                    <img src={iconEmpty} alt={'icon-empty'} />
                    <Paragraph
                        className={styles['paragraph-diminati-empty']}
                        variant={'body-1'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Belum ada produkmu yang diminati nih,'}
                        <br />
                        {'sabar ya rejeki nggak kemana kok'}
                    </Paragraph>
                </div>
            );
        } else if (page == 3) {
            return (
                <div className={styles.diminati}>
                    <img src={iconEmpty} alt={'icon-empty'} />
                    <Paragraph
                        className={styles['paragraph-diminati-empty']}
                        variant={'body-1'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Belum ada produkmu yang terjual nih,'}
                        <br />
                        {'sabar ya rejeki nggak kemana kok'}
                    </Paragraph>
                </div>
            );
        }
    };

    return (
        <section className={styles.root}>
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
                ></img>
                <div className={styles['seller-detail']}>
                    <Paragraph
                        className={styles['seller-name']}
                        variant={'body-1'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Nama Penjual'}
                    </Paragraph>
                    <Paragraph
                        className={styles['seller-city']}
                        variant={'body-3'}
                        color={'neutral'}
                        weight={'lighter'}
                    >
                        {'Kota'}
                    </Paragraph>
                </div>
                <div className={styles['btn-wrapper']}>
                    <Button type={'button'} variant={'secondary'}>
                        {'Edit'}
                    </Button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.category}>
                    <Title
                        tagElement={'h2'}
                        variant={'title-2'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Kategori'}
                    </Title>
                    <div className={styles.wrapper}>
                        <div
                            className={styles.item}
                            onClick={() => {
                                setFilter('semua');
                                setPage(1);
                            }}
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
                                tagElement={'h2'}
                                variant={'title-2'}
                                weight={'medium'}
                                color={filter === 'semua' ? 'purple' : 'black'}
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
                            className={styles.item}
                            onClick={() => {
                                setFilter('diminati');
                                setPage(2);
                            }}
                        >
                            <img
                                className={styles['icon-left']}
                                src={
                                    filter === 'diminati'
                                        ? iconHeartPurple
                                        : iconHeartGrey
                                }
                                onClick={() => setFilter('diminati')}
                                alt={'box-heart'}
                            />
                            <Title
                                className={styles['item-name']}
                                tagElement={'h2'}
                                variant={'title-2'}
                                weight={'medium'}
                                color={
                                    filter === 'diminati' ? 'purple' : 'black'
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
                            onClick={() => {
                                setFilter('terjual');
                                setPage(3);
                            }}
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
                                tagElement={'h2'}
                                variant={'title-2'}
                                weight={'medium'}
                                color={
                                    filter === 'terjual' ? 'purple' : 'black'
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
                {renderPage()}
            </div>
        </section>
    );
};

export default SellerPage;
