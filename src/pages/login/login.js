import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

// Components
import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();

    const handleLogin = data => {
        localStorage.setItem('altToken', data.email);
        navigate('/');
    };

    return (
        <section className={styles.root}>
            <div className={styles.image} />
            <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
                <Title
                    tagElement={'h1'}
                    variant={'heading-1'}
                    color={'black'}
                    weight={'bold'}
                >
                    {'Masuk'}
                </Title>
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Email'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        type={'email'}
                        placeholder={'Contoh: johndee@gmail.com'}
                        {...register('email', { required: true })}
                    />
                </Input>
                {errors.email && errors.email.type === 'required' && (
                    <p className={styles.error}>*Required field*</p>
                )}
                <Paragraph variant={'body-2'} className={styles.label}>
                    {'Email'}
                </Paragraph>
                <Input className={styles.input}>
                    <input
                        type={'password'}
                        placeholder={'Masukkan password'}
                    />
                </Input>
                <Button type={'submit'} variant={'primary'} color={'white'}>
                    {'Masuk'}
                </Button>
                <div className={styles.register}>
                    <Paragraph variant={'body-2'}>
                        {'Belum punya akun?'}
                    </Paragraph>
                    <Link to={'/register'}>{'Daftar di sini'}</Link>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
