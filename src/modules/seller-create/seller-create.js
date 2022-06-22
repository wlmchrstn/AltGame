import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './seller-create.module.scss';

// Components
import Input from '../../components/input/input';
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import plus from '../../assets/icons/fi_plus.svg';

const SellerCreate = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleCreate = data => {
        console.log(data);
    };

    return (
        <section className={styles.root}>
            <img src={arrowLeft} alt={'fi_arrow-left'} />
            <form onSubmit={handleSubmit(handleCreate)}>
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Nama Produk'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('nama', { required: true })}
                        placeholder={'Nama Produk'}
                        type={'text'}
                    />
                </Input>
                {errors.nama && errors.nama.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Harga Produk'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('harga', { required: true })}
                        placeholder={'Harga Produk'}
                        type={'number'}
                    />
                </Input>
                {errors.harga && errors.harga.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Kategori'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('category', { required: true })}
                        placeholder={'Pilih Kategori'}
                    />
                </Input>
                {errors.category && errors.category.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Deskripsi'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('desc', { required: true })}
                        placeholder={'Contoh: Jalan Ikan Hiu 33'}
                    />
                </Input>
                {errors.desc && errors.desc.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Foto Produk'}
                </Paragraph>
                <div className={styles.file}>
                    <img src={plus} alt={'fi_plus'} />
                </div>
                <Button type={'submit'} variant={'primary'}>
                    {'Terbitkan'}
                </Button>
            </form>
        </section>
    );
};

export default SellerCreate;
