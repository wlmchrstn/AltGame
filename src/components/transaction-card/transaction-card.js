import React, { useState } from 'react';
import styles from './transaction-card.module.scss';
import PropTypes from 'prop-types';
import { formatRupiah } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// Components
import Paragraph from '../paragraph/paragraph';
import Button from '../button/button';
import Modal from '../modal/modal';
import Input from '../input/input';
import Spinner from '../spinner/spinner';

// Assets
import shoppingBag from '../../assets/icons/fi_shopping-bag.svg';
import iconEdit from '../../assets/icons/fi_edit.svg';
import iconDelete from '../../assets/icons/fi_trash.svg';
import plus from '../../assets/icons/fi_plus.svg';

// Actions
import { deleteBid, updateBid, payBid } from '../../stores/actions/ActionBid';

const TransactionCard = ({ data, notification, refresh, ...props }) => {
    const { createdAt, product, bidId, price, status } = data;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [bidEdit, setBidEdit] = useState(false);
    const [bidDelete, setBidDelete] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();
    const { buttonLoading } = useSelector(state => state.ReducerBid);

    const handleForm = params => {
        const { address, image } = params;
        const req = new FormData();
        if (image?.length > 0) req.append('image', image[0]);
        req.append('address', address);

        dispatch(
            payBid(bidId, req, setIsOpen, notification, refresh, navigate)
        );
    };

    const handleEditBid = params => {
        dispatch(
            updateBid(
                bidId,
                params,
                setBidEdit,
                notification,
                refresh,
                navigate
            )
        );
    };

    const handleDeleteBid = params => {
        dispatch(
            deleteBid(params, setBidDelete, notification, refresh, navigate)
        );
    };

    const mapButton = () => {
        if (status === 'accepted') {
            return (
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => setIsOpen(true)}
                >
                    {'Upload bukti pembayaran'}
                </Button>
            );
        } else if (status === 'finish') {
            return (
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => console.log('invoice')}
                >
                    {'Lihat Invoice'}
                </Button>
            );
        } else {
            return (
                <Button
                    type={'button'}
                    variant={'primary'}
                    onClick={() => navigate(`/product/${product.productId}`)}
                >
                    {'Lihat halaman produk'}
                </Button>
            );
        }
    };

    const mapCategoryId = params => {
        switch (params) {
            case 1:
                return 'Console';
            case 2:
                return 'Video Game';
            case 3:
                return 'Controller';
            case 4:
                return 'Aksesoris';
            case 5:
                return 'Board Game';
            case 6:
                return 'Collectible';
            case 7:
                return 'Other';
            default:
                return 'Other';
        }
    };

    return (
        <div className={styles.root} {...props}>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <form
                    className={styles.payment}
                    onSubmit={handleSubmit(handleForm)}
                >
                    <Paragraph variant={'body-2'} className={styles.label}>
                        {'Alamat Pengiriman'}
                    </Paragraph>
                    <Input className={styles.input}>
                        <input
                            {...register('address', { required: true })}
                            placeholder={'Alamat Pengiriman'}
                            type={'text'}
                        />
                    </Input>
                    {errors.address && errors.address.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <Paragraph variant={'body-2'} className={styles.label}>
                        {'Bukti Pembayaran'}
                    </Paragraph>
                    <div className={styles.file}>
                        <img src={plus} alt={'fi_plus'} />
                        <input
                            {...register('image', { required: true })}
                            type={'file'}
                        />
                    </div>
                    {errors.image && errors.image.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <Button type={'submit'} variant={'primary'}>
                        {buttonLoading ? (
                            <Spinner variant={'button'} />
                        ) : (
                            'Upload bukti pembayaran'
                        )}
                    </Button>
                </form>
            </Modal>
            <div className={styles.header}>
                <img src={shoppingBag} alt={'fi_shopping-bag'} />
                <div className={styles['header-content']}>
                    <div className={styles['header-detail']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {'Belanja'}
                        </Paragraph>
                        <Paragraph variant={'body-3'} color={'neutral'}>
                            {moment(createdAt).format('LLL')}
                        </Paragraph>
                    </div>
                    <Paragraph className={styles[status]} variant={'body-1'}>
                        {status === 'accepted'
                            ? 'Menunggu Pembayaran'
                            : status === 'active'
                            ? 'Menunggu penjual'
                            : status === 'declined'
                            ? 'Ditolak'
                            : status === 'finish'
                            ? 'Selesai'
                            : status}
                    </Paragraph>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles['content-top']}>
                    <img src={product.image} alt={'imgcard'} />
                    <div className={styles['content-product']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {product.name}
                        </Paragraph>
                        <Paragraph variant={'body-1'} color={'neutral'}>
                            {mapCategoryId(product.categoryId)}
                        </Paragraph>
                    </div>
                </div>
                <div className={styles['content-bottom']}>
                    <div className={styles['content-price']}>
                        <Paragraph variant={'body-3'} color={'neutral'}>
                            {'Total Belanja'}
                        </Paragraph>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {formatRupiah(price)}
                        </Paragraph>
                    </div>
                    <div className={styles['content-button']}>
                        {status === 'active' ? (
                            <div className={styles['button-audit']}>
                                <img
                                    src={iconEdit}
                                    alt={'fi_edit'}
                                    onClick={() => setBidEdit(true)}
                                />
                                <Modal
                                    open={bidEdit}
                                    onClose={() => setBidEdit(false)}
                                    className={styles['bid-modal-edit']}
                                >
                                    <form
                                        onSubmit={handleSubmit(handleEditBid)}
                                    >
                                        <Paragraph
                                            variant={'body-2'}
                                            className={styles.label}
                                        >
                                            {'Harga Tawar'}
                                        </Paragraph>
                                        <Input className={styles.input}>
                                            <input
                                                {...register('price', {
                                                    required: true,
                                                })}
                                                placeholder={price}
                                                type={'number'}
                                            />
                                        </Input>
                                        {errors.price &&
                                            errors.price.type ===
                                                'required' && (
                                                <p className={styles.error}>
                                                    *Required field*
                                                </p>
                                            )}
                                        <Button
                                            variant={'primary'}
                                            type={'submit'}
                                        >
                                            {buttonLoading ? (
                                                <Spinner variant={'button'} />
                                            ) : (
                                                'Update harga tawar'
                                            )}
                                        </Button>
                                    </form>
                                </Modal>
                                <img
                                    src={iconDelete}
                                    alt={'fi_delete'}
                                    onClick={() => setBidDelete(true)}
                                />
                                <Modal
                                    open={bidDelete}
                                    onClose={() => setBidDelete(false)}
                                    className={styles['bid-modal-delete']}
                                >
                                    <Paragraph
                                        variant={'title-1'}
                                        className={styles.label}
                                    >
                                        {'Batalkan tawaran?'}
                                    </Paragraph>
                                    <Button
                                        type={'button'}
                                        variant={'primary'}
                                        onClick={() => handleDeleteBid(bidId)}
                                    >
                                        {buttonLoading ? (
                                            <Spinner variant={'button'} />
                                        ) : (
                                            'Konfirmasi batal'
                                        )}
                                    </Button>
                                </Modal>
                            </div>
                        ) : null}
                        {mapButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};

TransactionCard.propTypes = {
    data: PropTypes.object.isRequired,
    notification: PropTypes.func,
    refresh: PropTypes.func,
};

TransactionCard.defaultProps = {
    data: {},
    notification: null,
    refresh: null,
};

export default TransactionCard;
