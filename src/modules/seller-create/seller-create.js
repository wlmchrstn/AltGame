import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './seller-create.module.scss';

// Components
import Input from '../../components/input/input';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Spinner from '../../components/spinner/spinner';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import plus from '../../assets/icons/fi_plus.svg';

// Actions
import { addSellerProduct } from '../../stores/actions/ActionSeller';

const SellerCreate = ({
    handleCreate,
    handleNotification,
    refresh,
    setRefresh,
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { buttonLoading } = useSelector(state => state.ReducerSeller);

    const handleForm = data => {
        const { categoryId, name, description, price, image } = data;
        const req = new FormData();
        req.append('categoryId', categoryId);
        req.append('name', name);
        req.append('description', description);
        req.append('price', price);
        if (image?.length > 0) req.append('image', image[0]);

        dispatch(
            addSellerProduct(
                req,
                handleCreate,
                handleNotification,
                navigate,
                refresh,
                setRefresh
            )
        );
    };

    return (
        <section className={styles.root}>
            <img
                src={arrowLeft}
                alt={'fi_arrow-left'}
                onClick={() => handleCreate('landing')}
            />
            <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Nama Produk'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('name', { required: true })}
                        placeholder={'Nama Produk'}
                        type={'text'}
                    />
                </Input>
                {errors.name && errors.name.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Harga Produk'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('price', { required: true })}
                        placeholder={'Harga Produk'}
                        type={'number'}
                    />
                </Input>
                {errors.price && errors.price.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Kategori'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('categoryId', { required: true })}
                        placeholder={'Pilih Kategori'}
                    />
                </Input>
                {errors.categoryId && errors.categoryId.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Deskripsi'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('description', { required: true })}
                        placeholder={'Contoh: Jalan Ikan Hiu 33'}
                    />
                </Input>
                {errors.description &&
                    errors.description.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Foto Produk'}
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
                        'Terbitkan'
                    )}
                </Button>
            </form>
        </section>
    );
};

SellerCreate.propTypes = {
    handleCreate: PropTypes.func,
    handleNotification: PropTypes.func,
    refresh: PropTypes.bool,
    setRefresh: PropTypes.func,
};

SellerCreate.defaultProps = {
    handleCreate: null,
    handleNotification: null,
    refresh: null,
    setRefresh: null,
};

export default SellerCreate;
