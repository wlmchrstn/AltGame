import React, { useState, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styles from './login.module.scss';

// Components
import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Notification from '../../components/notification/notification';

// Actions
import { login } from '../../stores/actions/ActionAuth';
import Spinner from '../../components/spinner/spinner';

export const LoginPage = () => {
    const [notification, setNotification] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.ReducerAuth);

    useLayoutEffect(() => {
        const updateScreenSize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const handleLogin = async data => {
        dispatch(login(data, navigate, setNotification));
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
                {screenSize > 767 ? <div className={styles.image} /> : null}
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <Title
                        tagElement={'h1'}
                        variant={'heading-1'}
                        color={'black'}
                        weight={'bold'}
                    >
                        {'Masuk'}
                    </Title>
                    <Paragraph variant={'body-2'} className={styles.label}>
                        {'Username'}
                    </Paragraph>
                    <Input className={styles.input}>
                        <input
                            type={'text'}
                            placeholder={'Contoh: johndee@gmail.com'}
                            {...register('username', { required: true })}
                        />
                    </Input>
                    {errors.username && errors.username.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <Paragraph variant={'body-2'} className={styles.label}>
                        {'Password'}
                    </Paragraph>
                    <Input className={styles.input}>
                        <input
                            type={'password'}
                            placeholder={'Masukkan password'}
                            {...register('password', { required: true })}
                        />
                    </Input>
                    {errors.password && errors.password.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <Button type={'submit'} variant={'primary'} color={'white'}>
                        {loading ? <Spinner variant={'button'} /> : 'Masuk'}
                    </Button>
                    <div className={styles.register}>
                        <Paragraph variant={'body-2'}>
                            {'Belum punya akun?'}
                        </Paragraph>
                        <Link to={'/register'}>{'Daftar di sini'}</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
