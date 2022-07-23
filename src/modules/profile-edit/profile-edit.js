import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-edit.module.scss';
import { useNavigate } from 'react-router-dom';
import { convertToBase64 } from '../../utils/helper';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Spinner from '../../components/spinner/spinner';

// Assets
import camera_purple from '../../assets/icons/fi_camera_purple.svg';

// Actions
import { updateUser } from '../../stores/actions/ActionAuth';
import classNames from 'classnames';

const ProfileEdit = ({ notification, modal, refresh }) => {
    const { user, buttonLoading } = useSelector(state => state.ReducerAuth);
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: user.name,
            city: user.city,
            email: user.email,
            phone: user.phone,
            bankAccount: user.bankAccount,
        },
    });
    const navigate = useNavigate();
    const [file, setFile] = useState('');

    const handleCreateBase64 = useCallback(async e => {
        const preview = e.target.files[0];
        const base64 = await convertToBase64(preview);
        setFile(base64);
    }, []);

    const handleUpdate = data => {
        const { name, city, email, phone, image, bankAccount } = data;
        const req = new FormData();
        req.append('name', name);
        req.append('city', city);
        req.append('email', email);
        req.append('phone', phone);

        if (bankAccount !== null) {
            req.append('bankAccount', bankAccount);
        } else {
            req.append('bankAccount', null);
        }
        dispatch(
            updateUser(req, image, notification, modal, refresh, navigate)
        );
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
            <div
                className={classNames(
                    styles.camera,
                    file ? styles['no-bg'] : ''
                )}
            >
                {file ? (
                    <img
                        className={styles['camera-preview']}
                        src={file}
                        alt={'image-preview'}
                    />
                ) : (
                    <img src={camera_purple} alt={'fi_camera_purple'} />
                )}
                <input
                    {...register('image')}
                    type={'file'}
                    onChange={handleCreateBase64}
                />
            </div>
            <Paragraph variant={'body-2'} className={styles.label}>
                {'Name'}
            </Paragraph>
            <Input className={styles.input}>
                <input
                    {...register('name', { required: true })}
                    placeholder={user.name}
                    type={'text'}
                />
            </Input>
            {errors.name && errors.name.type === 'required' && (
                <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>
                {'Kota'}
            </Paragraph>
            <Input className={styles.input}>
                <input
                    {...register('city', { required: true })}
                    placeholder={'Kota'}
                    type={'text'}
                />
            </Input>
            {errors.city && errors.city.type === 'required' && (
                <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>
                {'Email'}
            </Paragraph>
            <Input className={styles.input}>
                <input
                    {...register('email', { required: true })}
                    placeholder={'Email'}
                    type={'email'}
                />
            </Input>
            {errors.email && errors.email.type === 'required' && (
                <p className={styles.error}>*Required field*</p>
            )}
            <Paragraph variant={'body-2'} className={styles.label}>
                {'No Handphone'}
            </Paragraph>
            <Input className={styles.input}>
                <input
                    {...register('phone', { required: true })}
                    placeholder={user.phone}
                />
            </Input>
            {errors.phone && errors.phone.type === 'required' && (
                <p className={styles.error}>*Required field*</p>
            )}
            {user.bankAccount !== null ? (
                <>
                    <Paragraph variant={'body-2'} className={styles.label}>
                        {'No Rekening'}
                    </Paragraph>
                    <Input className={styles.input}>
                        <input
                            {...register('bankAccount', { required: true })}
                            placeholder={'No Rekening'}
                            type={'text'}
                        />
                    </Input>
                    {errors.bankAccount &&
                        errors.bankAccount.type === 'required' && (
                            <p className={styles.error}>*Required field*</p>
                        )}
                </>
            ) : null}
            <Button type={'submit'} variant={'primary'}>
                {buttonLoading ? <Spinner variant={'button'} /> : 'Simpan'}
            </Button>
        </form>
    );
};

ProfileEdit.propTypes = {
    notification: PropTypes.func,
    modal: PropTypes.func,
    refresh: PropTypes.func,
};

ProfileEdit.defaultProps = {
    notification: null,
    modal: null,
    refresh: null,
};

export default ProfileEdit;
