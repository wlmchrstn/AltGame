import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './register.module.scss';

import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';

// Actions
import { registerUser } from '../../stores/actions/ActionAuth';

const Register = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [notification, setNotification] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading } = useSelector(state => state.ReducerAuth);

    const handleRegister = data => {
        dispatch(registerUser(data, navigate, setNotification));
    };

    return (
        <section className={styles.root}>
            <Notification
                message={error}
                variant={'failed'}
                show={notification}
                setShow={setNotification}
            />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Title
                        tagElement={'h1'}
                        variant={'heading-1'}
                        color={'black'}
                        weight={'bold'}
                    >
                        {'Daftar'}
                    </Title>
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className={styles.form}
                    >
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Name'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'text'}
                                name={'name'}
                                placeholder={'Nama lengkap'}
                                {...register('name', { required: true })}
                            />
                        </Input>
                        {errors.nama && errors.nama.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Username'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'text'}
                                name={'username'}
                                placeholder={'Masukkan Username'}
                                {...register('username', { required: true })}
                            />
                        </Input>
                        {errors.username &&
                            errors.username.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Email'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'email'}
                                name={'email'}
                                placeholder={'Contoh: johndee@gmail.com'}
                                {...register('email', { required: true })}
                            />
                        </Input>
                        {errors.email && errors.email.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Password'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'password'}
                                name={'password'}
                                placeholder={'Masukkan password'}
                                {...register('password', { required: true })}
                            />
                        </Input>
                        {errors.password &&
                            errors.password.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Phone'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'number'}
                                name={'phone'}
                                placeholder={'Contoh: 087898685848'}
                                {...register('phone', { required: true })}
                            />
                        </Input>
                        {errors.phone && errors.phone.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )}
                        <Button type={'submit'} variant={'primary'}>
                            {loading ? (
                                <Spinner variant={'button'} />
                            ) : (
                                'Daftar'
                            )}
                        </Button>
                    </form>
                    <div className={styles.login}>
                        <Paragraph variant={'body-2'}>
                            {'Sudah punya akun?'}
                        </Paragraph>
                        <Link to={'/login'}>{'Masuk di sini'}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
