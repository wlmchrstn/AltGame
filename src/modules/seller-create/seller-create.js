import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './seller-create.module.scss';

// Components
import Input from '../../components/input/input';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import plus from '../../assets/icons/fi_plus.svg';
import { setToken } from '../../utils/helper';

const SellerCreate = ({
    handleCreate,
    handleNotification,
    handleRefresh,
    refresh,
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleForm = async data => {
        setToken(sessionStorage.getItem('token'));
        const { categoryId, name, description, price, image } = data;
        const req = new FormData();
        req.append('categoryId', categoryId);
        req.append('name', name);
        req.append('description', description);
        req.append('price', price);
        if (image?.length > 0) req.append('image', image[0]);

        try {
            const { data: response } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/products/store`,
                req
            );
            console.log('berhasil tambah', response.message);
            handleCreate('landing');
            handleNotification(true);
            handleRefresh(!refresh);
        } catch (error) {
            console.log(error);
        }
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
                    {'Terbitkan'}
                </Button>
            </form>
        </section>
    );
};

SellerCreate.propTypes = {
    handleCreate: PropTypes.func,
    handleNotification: PropTypes.func,
    handleRefresh: PropTypes.func,
    refresh: PropTypes.bool,
};

SellerCreate.defaultProps = {
    handleCreate: null,
    handleNotification: null,
    handleRefresh: null,
    refresh: null,
};

export default SellerCreate;
