import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './profile.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';

// Assets
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import camera_purple from '../../assets/icons/fi_camera_purple.svg';

const ProfilePage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleUpdate = data => {
        console.log(data);
    };

    return (
        <section className={styles.root}>
            <img src={arrowLeft} alt={'fi_arrow-left'} />
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className={styles.camera}>
                    <img src={camera_purple} alt={'fi_camera_purple'} />
                </div>
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Nama'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('nama', { required: true })}
                        placeholder={'Nama'}
                        type={'text'}
                    />
                </Input>
                {errors.nama && errors.nama.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Kota'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('kota', { required: true })}
                        placeholder={'Pilih Kota'}
                        type={'text'}
                    />
                </Input>
                {errors.kota && errors.kota.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Alamat'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('alamat', { required: true })}
                        placeholder={'Contoh: Jalan Ikan Hiu 33'}
                    />
                </Input>
                {errors.alamat && errors.alamat.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'No Handphone'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        {...register('phone', { required: true })}
                        placeholder={'contoh: +628123456789'}
                    />
                </Input>
                {errors.phone && errors.phone.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Button type={'submit'} variant={'primary'}>
                    {'Simpan'}
                </Button>
            </form>
        </section>
    );
};

export default ProfilePage;
