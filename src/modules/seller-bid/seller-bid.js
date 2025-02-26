import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './seller-bid.module.scss';
import { formatRupiah } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import Notification from '../../components/notification/notification';
import Modal from '../../components/modal/modal';
import Spinner from '../../components/spinner/spinner';
import Input from '../../components/input/input';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import iconEmpty from '../../assets/icons/fi_empty.svg';
import iconEdit from '../../assets/icons/fi_edit.svg';
import iconDelete from '../../assets/icons/fi_trash.svg';
import iconPlus from '../../assets/icons/fi_plus.svg';

// Actions
import { getAllBid, acceptBid } from '../../stores/actions/ActionBid';
import {
    deleteSellerProduct,
    updateSellerProduct,
} from '../../stores/actions/ActionSeller';
import { getProduct } from '../../stores/actions/ActionProduct';

const Bid = ({ data, product, refresh }) => {
    const { bidId, user, price, status } = data;
    const [notification, setNotification] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { buttonLoading, message, messageStatus } = useSelector(
        state => state.ReducerBid
    );
    const navigate = useNavigate();

    const handleTerima = params => {
        dispatch(
            acceptBid(params, refresh, setIsOpen, setNotification, navigate)
        );
    };

    const handleWaiting = () => {
        console.log('handle waiting');
    };

    return (
        <div className={styles['bid-wrapper']}>
            <Notification
                message={message}
                variant={messageStatus}
                show={notification}
                setShow={setNotification}
            />
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <div className={styles['modal-match']}>
                    <Paragraph
                        className={styles['modal-header']}
                        variant={'body-1'}
                        weight={'medium'}
                    >
                        {'Product Match'}
                    </Paragraph>
                    <div className={styles['modal-wrapper']}>
                        <img src={product.image} alt={'placeholder'} />
                        <div className={styles['modal-detail']}>
                            <Paragraph variant={'body-1'}>
                                {user.name}
                            </Paragraph>
                            <Paragraph variant={'body-3'}>
                                {user.city}
                            </Paragraph>
                        </div>
                    </div>
                    <div className={styles['modal-wrapper']}>
                        <img src={product.image} alt={'placeholder'} />
                        <div className={styles['modal-product']}>
                            <Paragraph variant={'body-1'}>
                                {product.name}
                            </Paragraph>
                            <Paragraph
                                className={styles['line-through']}
                                variant={'body-1'}
                            >
                                {formatRupiah(product.price)}
                            </Paragraph>
                            <Paragraph variant={'body-1'}>
                                {`Ditawar ${formatRupiah(price)}`}
                            </Paragraph>
                        </div>
                    </div>
                </div>
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => handleTerima(bidId)}
                >
                    {buttonLoading ? (
                        <Spinner variant={'button'} />
                    ) : (
                        'Terima Tawaran'
                    )}
                </Button>
            </Modal>
            <div className={styles.user}>
                <img src={product.image} alt={'placeholder'} />
                <div className={styles['user-detail']}>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {user.name}
                    </Paragraph>
                    <Paragraph variant={'body-1'} color={'neutral'}>
                        {user.city}
                    </Paragraph>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {formatRupiah(price)}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.button}>
                {status === 'active' ? (
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() => setIsOpen(true)}
                    >
                        {'Terima'}
                    </Button>
                ) : status === 'accepted' ? (
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() => handleWaiting()}
                    >
                        {'Hubungi penawar'}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

const SellerBid = ({
    productId,
    handleBid,
    handleNotification,
    setRefresh,
}) => {
    const dispatch = useDispatch();
    const { loading, listBids } = useSelector(state => state.ReducerBid);
    const { buttonLoading } = useSelector(state => state.ReducerSeller);
    const { product } = useSelector(state => state.ReducerProduct);
    const { name, category, price, status, image } = product;
    const productLoading = useSelector(state => state.ReducerProduct.loading);
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [refreshBid, setRefreshBid] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        dispatch(getProduct(productId));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllBid(productId, navigate));
    }, [dispatch, refreshBid]);

    const mapTawar = params => {
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
                        {'Yang sabar ya,'}
                        <br />
                        {'belum ada yang nawar nih'}
                    </Paragraph>
                </div>
            );
        }
        return params.map((value, index) => {
            if (value.status === 'declined') {
                return null;
            } else {
                return (
                    <Bid
                        data={value}
                        product={product}
                        key={index}
                        refresh={setRefreshBid}
                    />
                );
            }
        });
    };

    const handleEdit = data => {
        const { categoryId, name, description, price, image } = data;
        const req = new FormData();
        req.append('categoryId', categoryId);
        req.append('name', name);
        req.append('description', description);
        req.append('price', price);
        if (image?.length > 0) req.append('image', image[0]);

        dispatch(
            updateSellerProduct(
                productId,
                req,
                navigate,
                setIsEdit,
                handleBid,
                handleNotification,
                setRefresh
            )
        );
    };

    const handleDelete = params => {
        dispatch(
            deleteSellerProduct(
                params,
                navigate,
                handleBid,
                handleNotification,
                setRefresh
            )
        );
    };

    if (productLoading) return <Spinner variant={'page'} />;

    return (
        <div className={styles.root}>
            <img
                src={arrowLeft}
                alt={'fi_arrow-left'}
                onClick={() => handleBid('landing')}
            />
            <div className={styles.container}>
                <div className={styles.product}>
                    <div className={styles['product-left']}>
                        <img
                            className={styles['product-image']}
                            src={image}
                            alt={'placeholder'}
                        />
                        <div className={styles['product-detail']}>
                            <Paragraph variant={'body-1'} color={'black'}>
                                {name}
                            </Paragraph>
                            <Paragraph variant={'body-1'} color={'black'}>
                                {category}
                            </Paragraph>
                            <Paragraph variant={'body-1'} color={'black'}>
                                {formatRupiah(price)}
                            </Paragraph>
                        </div>
                    </div>
                    <div className={styles['product-right']}>
                        {status === 'waiting' ||
                        status === 'inactive' ? null : (
                            <img
                                src={iconEdit}
                                alt={'fi_edit'}
                                onClick={() => setIsEdit(true)}
                            />
                        )}
                        <Modal
                            open={isEdit}
                            onClose={() => setIsEdit(false)}
                            className={styles.edit}
                        >
                            <form
                                className={styles['edit-form']}
                                onSubmit={handleSubmit(handleEdit)}
                            >
                                <Paragraph
                                    variant={'body-2'}
                                    className={styles['edit-label']}
                                >
                                    {'Nama Produk'}
                                </Paragraph>
                                <Input className={styles['edit-input']}>
                                    <input
                                        {...register('name', {
                                            required: true,
                                        })}
                                        placeholder={name}
                                        type={'text'}
                                    />
                                </Input>
                                {errors.name &&
                                    errors.name.type === 'required' && (
                                        <p className={styles.error}>
                                            *Required field*
                                        </p>
                                    )}
                                <Paragraph
                                    variant={'body-2'}
                                    className={styles['edit-label']}
                                >
                                    {'Harga Produk'}
                                </Paragraph>
                                <Input className={styles['edit-input']}>
                                    <input
                                        {...register('price', {
                                            required: true,
                                        })}
                                        placeholder={price}
                                        type={'number'}
                                    />
                                </Input>
                                {errors.price &&
                                    errors.price.type === 'required' && (
                                        <p className={styles.error}>
                                            *Required field*
                                        </p>
                                    )}
                                <Paragraph
                                    variant={'body-2'}
                                    className={styles['edit-label']}
                                >
                                    {'Kategori'}
                                </Paragraph>
                                <Input className={styles['edit-input']}>
                                    <select
                                        {...register('categoryId', {
                                            required: true,
                                        })}
                                    >
                                        <option value={'1'}>{'Console'}</option>
                                        <option value={'2'}>
                                            {'Video Game'}
                                        </option>
                                        <option value={'3'}>
                                            {'Controller'}
                                        </option>
                                        <option value={'4'}>
                                            {'Aksesoris'}
                                        </option>
                                        <option value={'5'}>
                                            {'Board Game'}
                                        </option>
                                        <option value={'6'}>
                                            {'Collectible'}
                                        </option>
                                        <option value={'7'}>{'Other'}</option>
                                    </select>
                                </Input>
                                {errors.categoryId &&
                                    errors.categoryId.type === 'required' && (
                                        <p className={styles.error}>
                                            *Required field*
                                        </p>
                                    )}
                                <Paragraph
                                    variant={'body-2'}
                                    className={styles['edit-label']}
                                >
                                    {'Deskripsi'}
                                </Paragraph>
                                <Input className={styles['edit-input']}>
                                    <input
                                        {...register('description', {
                                            required: true,
                                        })}
                                        placeholder={'Deskripsi'}
                                    />
                                </Input>
                                {errors.description &&
                                    errors.description.type === 'required' && (
                                        <p className={styles.error}>
                                            *Required field*
                                        </p>
                                    )}
                                <Paragraph
                                    variant={'body-2'}
                                    className={styles['edit-label']}
                                >
                                    {'Foto Produk'}
                                </Paragraph>
                                <div className={styles['edit-file']}>
                                    <img src={iconPlus} alt={'fi_plus'} />
                                    <input
                                        {...register('image', {
                                            required: true,
                                        })}
                                        type={'file'}
                                    />
                                </div>
                                {errors.image &&
                                    errors.image.type === 'required' && (
                                        <p className={styles.error}>
                                            *Required field*
                                        </p>
                                    )}
                                <Button type={'submit'} variant={'primary'}>
                                    {buttonLoading ? (
                                        <Spinner variant={'button'} />
                                    ) : (
                                        'Update Produk'
                                    )}
                                </Button>
                            </form>
                        </Modal>
                        {status === 'waiting' ||
                        status === 'inactive' ? null : (
                            <img
                                src={iconDelete}
                                alt={'fi_trash'}
                                onClick={() => setIsDelete(true)}
                            />
                        )}
                        <Modal
                            open={isDelete}
                            onClose={() => setIsDelete(false)}
                            className={styles.delete}
                        >
                            <Paragraph
                                variant={'title-1'}
                                className={styles['delete-label']}
                            >
                                {'Produk ini akan dihapus dari daftar produkmu'}
                            </Paragraph>
                            <Button
                                type={'button'}
                                variant={'primary'}
                                onClick={() => handleDelete(productId)}
                            >
                                {buttonLoading ? (
                                    <Spinner variant={'button'} />
                                ) : (
                                    'Konfirmasi hapus'
                                )}
                            </Button>
                        </Modal>
                    </div>
                </div>
                <Title
                    className={styles.header}
                    tagElement={'h2'}
                    variant={'title-1'}
                    weight={'bold'}
                >
                    {'Daftar Penawar'}
                </Title>
                <div className={styles.bid}>
                    {loading ? (
                        <Spinner variant={'page'} />
                    ) : (
                        mapTawar(listBids)
                    )}
                </div>
            </div>
        </div>
    );
};

Bid.propTypes = {
    data: PropTypes.object,
    product: PropTypes.object,
    refresh: PropTypes.func,
};

Bid.defaultProps = {
    data: {},
    product: {},
    refresh: null,
};

SellerBid.propTypes = {
    productId: PropTypes.number,
    handleBid: PropTypes.func,
    handleNotification: PropTypes.func,
    setRefresh: PropTypes.func,
};

SellerBid.defaultProps = {
    productId: null,
    handleBid: null,
    handleNotification: null,
    setRefresh: null,
};

export default SellerBid;
