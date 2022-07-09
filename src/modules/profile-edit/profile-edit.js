import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styles from './profile-edit.module.scss';

// Components
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Spinner from '../../components/spinner/spinner';

// Assets
import camera_purple from '../../assets/icons/fi_camera_purple.svg';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../stores/actions/ActionAuth';

const ProfileEdit = ({ user, notification, failedNotification }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = data => {
        dispatch(
            updateUser(data, setIsLoading, notification, failedNotification)
        );
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
            <div className={styles.camera}>
                <img src={camera_purple} alt={'fi_camera_purple'} />
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
            <Button type={'submit'} variant={'primary'}>
                {isLoading ? <Spinner variant={'button'} /> : 'Simpan'}
            </Button>
        </form>
    );
};

ProfileEdit.propTypes = {
    user: PropTypes.object,
    notification: PropTypes.func,
    failedNotification: PropTypes.func,
};

ProfileEdit.defaultProps = {
    user: {},
    notification: null,
    failedNotification: null,
};

export default ProfileEdit;
