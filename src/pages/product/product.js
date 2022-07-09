import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { formatRupiah } from '../../utils/helper';
import styles from './product.module.scss';

// Components
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import Input from '../../components/input/input';
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';
import Notification from '../../components/notification/notification';

// Assets
import imgPlaceholder from '../../assets/images/product-image.png';

// Actions
import { getProduct } from '../../stores/actions/ActionProduct';
import { getUser } from '../../stores/actions/ActionAuth';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, productOwner, loading } = useSelector(
        state => state.ReducerProduct
    );
    const { user } = useSelector(state => state.ReducerAuth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [notification, setNotification] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleTawar = data => {
        console.log(data);
        setNotification(true);
        setIsOpen(false);
    };

    useEffect(() => {
        dispatch(getUser());
        dispatch(getProduct(id));
    }, [dispatch]);

    if (loading === true) return <p>loading</p>;

    return (
        <section className={styles.root}>
            <Notification
                message={'Harga tawarmu berhasil dikirim ke penjual'}
                variant={'success'}
                show={notification}
                setShow={setNotification}
            />
            <div className={styles.left}>
                <div
                    className={styles.carousel}
                    style={{
                        backgroundImage: `url("data:image/jpeg;base64,${product.image}")`,
                    }}
                />
                <div className={styles.desc}>
                    <Paragraph
                        className={styles['desc-header']}
                        variant={'body-1'}
                        weight={'medium'}
                        color={'black'}
                    >
                        Deskripsi
                    </Paragraph>
                    <Paragraph variant={'body-1'} color={'neutral'}>
                        {product.description}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.product}>
                    <Title
                        tagElement={'h2'}
                        className={styles['product-title']}
                        variant={'title-2'}
                        weight={'medium'}
                    >
                        {product.name}
                    </Title>
                    <Paragraph
                        className={styles['product-category']}
                        variant={'body-1'}
                    >
                        {product.categoryId}
                    </Paragraph>
                    <Title
                        tagElement={'h2'}
                        className={styles['product-price']}
                        variant={'title-2'}
                        weight={'medium'}
                    >
                        {formatRupiah(product.price)}
                    </Title>
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={handleClick}
                        disabled={
                            user.username === productOwner.username
                                ? true
                                : false
                        }
                    >
                        Saya tertarik dan ingin nego
                    </Button>
                    <Modal
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className={styles.modal}
                    >
                        <Paragraph
                            className={styles['modal-header']}
                            variant={'body-1'}
                            weight={'medium'}
                        >
                            Masukkan Harga Tawarmu
                        </Paragraph>
                        <Paragraph
                            className={styles['modal-header']}
                            variant={'body-1'}
                            color={'neutral'}
                        >
                            Harga tawaranmu akan diketahui penjual, jika cocok
                            kamu dapat melanjutkan ke pembayaran.
                        </Paragraph>
                        <div className={styles['product-summary']}>
                            <img
                                className={styles['product-image']}
                                src={imgPlaceholder}
                                alt={'seller-image'}
                            />
                            <div className={styles['product-detail']}>
                                <Paragraph
                                    className={styles['product-detail-title']}
                                    variant={'body-1'}
                                    weight={'medium'}
                                >
                                    {product.name}
                                </Paragraph>
                                <Paragraph variant={'body-1'}>
                                    {formatRupiah(product.price)}
                                </Paragraph>
                            </div>
                        </div>
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit(handleTawar)}
                        >
                            <Paragraph
                                className={styles['form-label']}
                                variant={'body-2'}
                            >
                                Harga Tawar
                            </Paragraph>
                            <Input>
                                <input
                                    type={'number'}
                                    placeholder={'Rp 0,00'}
                                    {...register('harga', {
                                        required: true,
                                    })}
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
                        <Paragraph
                            className={styles['seller-name']}
                            variant={'body-1'}
                            weight={'medium'}
                        >
                            {productOwner.name}
                        </Paragraph>
                        <Paragraph variant={'body-3'} color={'neutral'}>
                            {productOwner.city}
                        </Paragraph>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
