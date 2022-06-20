import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './register.module.scss';

import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';

const Register = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleRegister = () => {
        console.log('berhasil');
    };

    return (
        <section className={styles.root}>
            <div className={styles.wrapper}>
                <Title
                    tagElement={'h1'}
                    variant={'heading-1-bold'}
                    color={'black'}
                >
                    {'Daftar'}
                </Title>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className={styles.form}
                >
                    <p>{'Nama'}</p>
                    <Input>
                        <input
                            type={'text'}
                            placeholder={'Nama lengkap'}
                            {...register('nama', { required: true })}
                        />
                    </Input>
                    {errors.nama && errors.nama.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <p>{'Email'}</p>
                    <Input>
                        <input
                            type={'email'}
                            placeholder={'Contoh: johndee@gmail.com'}
                            {...register('email', { required: true })}
                        />
                    </Input>
                    {errors.email && errors.email.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <p>{'Password'}</p>
                    <Input>
                        <input
                            type={'password'}
                            placeholder={'Masukkan password'}
                            {...register('password', { required: true })}
                        />
                    </Input>
                    {errors.password && errors.password.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <Button type={'submit'} variant={'primary'}>
                        {'Daftar'}
                    </Button>
                </form>
                <div className={styles.login}>
                    <p>{'Sudah punya akun?'}</p>
                    <Link to={'/login'}>{'Masuk di sini'}</Link>
                </div>
            </div>
        </section>
    );
};

export default Register;
