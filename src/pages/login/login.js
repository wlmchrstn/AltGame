import React from 'react';
import styles from './login.module.scss';

// Components
import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

export const LoginPage = () => {
    return (
        <section className={styles.root}>
            <div className={styles.image} />
            <form className={styles.form}>
                <Title
                    tagElement={'h1'}
                    variant={'heading-1'}
                    color={'black'}
                    weight={'bold'}
                >
                    {'Masuk'}
                </Title>
                <p>{'Email'}</p>
                <Input className={styles.input}>
                    <input
                        type={'text'}
                        placeholder={'Contoh: johndee@gmail.com'}
                    />
                </Input>
                <p>{'Password'}</p>
                <Input className={styles.input}>
                    <input
                        type={'password'}
                        placeholder={'Masukkan password'}
                    />
                </Input>
                <Button type={'submit'} variant={'primary'} color={'white'}>
                    {'Masuk'}
                </Button>
                <div className={styles['to-register']}>
                    <p>
                        {'Belum punya akun? '}
                        <a href="Register" alt="#">
                            {'Daftar di sini'}
                        </a>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
