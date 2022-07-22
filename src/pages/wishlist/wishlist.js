import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './wishlist.module.scss';

// Components
import Title from '../../components/title/title';
import WishlistCard from '../../components/wishlist-card/wishlist-card';
import Spinner from '../../components/spinner/spinner';
import Notification from '../../components/notification/notification';
import Paragraph from '../../components/paragraph/paragraph';

// Assets
import iconEmpty from '../../assets/icons/fi_empty.svg';

// Actions
import { getAllWishlist } from '../../stores/actions/ActionWishlist';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { wishlist, loading, message, messageStatus } = useSelector(
        state => state.ReducerWishlist
    );
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        dispatch(getAllWishlist(navigate));
    }, [dispatch, refresh]);

    const mapWishlist = params => {
        if (params.length === 0) {
            return (
                <div className={styles.empty}>
                    <img src={iconEmpty} alt={'icon-empty'} />
                    <Paragraph
                        className={styles['empty-text']}
                        variant={'body-1'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Wishlist kamu kosong'}
                    </Paragraph>
                </div>
            );
        }
        return params.map((wishlist, index) => {
            return (
                <WishlistCard
                    key={index}
                    data={wishlist}
                    notification={setNotification}
                    refresh={setRefresh}
                />
            );
        });
    };

    return (
        <section className={styles.root}>
            <Notification
                message={message}
                variant={messageStatus}
                show={notification}
                setShow={setNotification}
            />
            <div className={styles.header}>
                <Title
                    tagElement={'h2'}
                    variant={'title-2'}
                    color={'black'}
                    weight={'bold'}
                >
                    {'Wishlist Product'}
                </Title>
            </div>
            <div className={styles.main}>
                {loading ? <Spinner variant={'page'} /> : mapWishlist(wishlist)}
            </div>
        </section>
    );
};

export default WishlistPage;
