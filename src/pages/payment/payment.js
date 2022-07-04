import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../utils/helper';
import styles from './payment.module.scss';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Notification from '../../components/notification/notification';

// Assets
import imgcard from '../../assets/images/card-image.png';

const PaymentPage = () => {
    const [notification, setNotification] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handlePayment = data => {
        setNotification(true);
        navigate('/transaction');
        return console.log(data);
    };

    return (
        <section className={styles.root}>
            <Notification
                message={'Transaksimu berhasil'}
                variant={'success'}
                show={notification}
                setShow={setNotification}
            />
            <div className={styles.left}>
                <div className={styles.product}>
                    <img src={imgcard} alt={'imgcard'} />
                    <div className={styles['content-product']}>
                        <Paragraph variant={'body-1'} weight={'medium'}>
                            {'Jam Tangan Casio'}
                        </Paragraph>
                        <Paragraph variant={'body-1'} color={'neutral'}>
                            {'Aksesoris'}
                        </Paragraph>
                        <Paragraph variant={'body-1'}>
                            {formatRupiah(200000)}
                        </Paragraph>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(handlePayment)}
                >
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {'Alamat'}
                    </Paragraph>
                    <Input className={styles['form-input']}>
                        <input {...register('alamat', { required: true })} />
                    </Input>
                    <Paragraph
                        type={'text'}
                        variant={'body-1'}
                        weight={'medium'}
                    >
                        {'Bukti Pembayaran'}
                    </Paragraph>
                    <Input className={styles['form-input']}>
                        <input
                            type={'file'}
                            {...register('file', { required: true })}
                        />
                    </Input>
                    <Paragraph variant={'body-1'} weight={'medium'}>
                        {'Catatan'}
                    </Paragraph>
                    <Input className={styles['form-input']}>
                        <textarea {...register('catatan')} />
                    </Input>
                    {errors.alamat && errors.alamat.type === 'required' && (
                        <p className={styles.error}>*Required field*</p>
                    )}
                    <Button type={'submit'}>{'Konfirmasi Pembayaran'}</Button>
                </form>
            </div>
        </section>
    );
};

export default PaymentPage;
