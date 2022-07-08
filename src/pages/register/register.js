import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './register.module.scss';

import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const changeName = e => {
        const value = e.target.value;
        setName(value);
    };

    const changeUsername = e => {
        const value = e.target.value;
        setUsername(value);
    };

    const changeEmail = e => {
        const value = e.target.value;
        setEmail(value);
    };

    const changePassword = e => {
        const value = e.target.value;
        setPassword(value);
    };

    const changePhone = e => {
        const value = e.target.value;
        setPhone(value);
    };

    // const {
    //     register,
    //     formState: { errors },
    //     handleSubmit,
    // } = useForm();

    const handleRegister = () => {
        const data = {
            name: name,
            username: username,
            email: email,
            password: password,
            phone: phone,
        };
        console.log(data);

        axios
            .post(
                'https://api-altgame-production.herokuapp.com/api/signup',
                data
            )
            .then(result => {
                console.log(result);
            });
    };

    return (
        <section className={styles.root}>
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
                        // onSubmit={handleSubmit(handleRegister)}
                        onSubmit={() => {
                            handleRegister();
                        }}
                        className={styles.form}
                    >
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Nama'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'text'}
                                name={'name'}
                                placeholder={'Nama lengkap'}
                                value={name}
                                onChange={e => {
                                    changeName(e);
                                }}
                                // {...register('nama', { required: true })}
                            />
                        </Input>
                        {/* {errors.nama && errors.nama.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )} */}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Username'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'text'}
                                name={'username'}
                                placeholder={'Masukkan Username'}
                                value={username}
                                onChange={e => {
                                    changeUsername(e);
                                }}
                                // {...register('username', { required: true })}
                            />
                        </Input>
                        {/* {errors.username &&
                            errors.username.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )} */}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Email'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'email'}
                                name={'email'}
                                placeholder={'Contoh: johndee@gmail.com'}
                                value={email}
                                onChange={e => {
                                    changeEmail(e);
                                }}
                                // {...register('email', { required: true })}
                            />
                        </Input>
                        {/* {errors.email && errors.email.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )} */}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Password'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'password'}
                                name={'password'}
                                placeholder={'Masukkan password'}
                                value={password}
                                onChange={e => {
                                    changePassword(e);
                                }}
                                // {...register('password', { required: true })}
                            />
                        </Input>
                        {/* {errors.password &&
                            errors.password.type === 'required' && (
                                <p className={styles.error}>*Required field*</p>
                            )} */}
                        <Paragraph variant={'body-2'} className={styles.label}>
                            {'Phone'}
                        </Paragraph>
                        <Input className={styles.input}>
                            <input
                                type={'number'}
                                name={'phone'}
                                placeholder={'Contoh: 087898685848'}
                                value={phone}
                                onChange={e => {
                                    changePhone(e);
                                }}
                                // {...register('phone', { required: true })}
                            />
                        </Input>
                        {/* {errors.phone && errors.phone.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )} */}
                        <Button
                            type={'submit'}
                            variant={'primary'}
                            // onClick={() => {
                            //     handleRegister;
                            // }}
                        >
                            {'Daftar'}
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
