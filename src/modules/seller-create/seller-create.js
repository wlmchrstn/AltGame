import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './seller-create.module.scss';
import { convertToBase64 } from '../../utils/helper';

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

const SellerCreate = ({ handleCreate, handleNotification, setRefresh }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { buttonLoading } = useSelector(state => state.ReducerSeller);
    const [file, setFile] = useState('');

    const handleCreateBase64 = useCallback(async e => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFile(base64);
    }, []);

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
                    <select {...register('categoryId', { required: true })}>
                        <option value={'1'}>{'Console'}</option>
                        <option value={'2'}>{'Video Game'}</option>
                        <option value={'3'}>{'Controller'}</option>
                        <option value={'4'}>{'Aksesoris'}</option>
                        <option value={'5'}>{'Board Game'}</option>
                        <option value={'6'}>{'Collectible'}</option>
                        <option value={'7'}>{'Other'}</option>
                    </select>
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
                    {file ? (
                        <img
                            className={styles['file-preview']}
                            src={file}
                            alt={'image'}
                        />
                    ) : (
                        <img src={plus} alt={'fi_plus'} />
                    )}
                    <input
                        {...register('image', { required: true })}
                        type={'file'}
                        onChange={handleCreateBase64}
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
    setRefresh: PropTypes.func,
};

SellerCreate.defaultProps = {
    handleCreate: null,
    handleNotification: null,
    setRefresh: null,
};

export default SellerCreate;
