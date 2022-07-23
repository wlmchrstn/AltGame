import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.scss';

// Components
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';
import Spinner from '../../components/spinner/spinner';

// Assets
import camera_purple from '../../assets/icons/fi_camera_purple.svg';
import Title from '../../components/title/title';

// Modules
import ProfileEdit from '../../modules/profile-edit/profile-edit';

// Actions
import { getUser } from '../../stores/actions/ActionAuth';

const ProfilePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notification, setNotification] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const { message, messageStatus, user, loading } = useSelector(
        state => state.ReducerAuth
    );

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, refresh]);

    return (
        <section className={styles.root}>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <ProfileEdit
                    notification={setNotification}
                    modal={setIsOpen}
                    refresh={setRefresh}
                />
            </Modal>
            <Notification
                message={message}
                variant={messageStatus}
                show={notification}
                setShow={setNotification}
            />
            {loading ? (
                <Spinner variant={'page'} />
            ) : (
                <div className={styles.profile}>
                    {user.image ? (
                        <div className={styles['profile-image']}>
                            <img
                                src={`data:image/jpeg;base64,${user.image}`}
                                alt={'profile_image'}
                            />
                        </div>
                    ) : (
                        <div className={styles.camera}>
                            <img src={camera_purple} alt={'fi_camera_purple'} />
                        </div>
                    )}
                    <Paragraph
                        variant={'body-2'}
                        className={styles['profile-label']}
                        color={'neutral'}
                    >
                        {'Nama'}
                    </Paragraph>
                    <Title
                        tagElement={'p'}
                        variant={'title-1'}
                        weight={'medium'}
                        className={styles['profile-data']}
                    >
                        {user.name}
                    </Title>
                    <Paragraph
                        variant={'body-2'}
                        className={styles['profile-label']}
                        color={'neutral'}
                    >
                        {'Kota'}
                    </Paragraph>
                    <Title
                        tagElement={'p'}
                        variant={'title-1'}
                        weight={'medium'}
                        className={styles['profile-data']}
                    >
                        {user.city}
                    </Title>
                    <Paragraph
                        variant={'body-2'}
                        className={styles['profile-label']}
                        color={'neutral'}
                    >
                        {'Email'}
                    </Paragraph>
                    <Title
                        tagElement={'p'}
                        variant={'title-1'}
                        weight={'medium'}
                        className={styles['profile-data']}
                    >
                        {user.email}
                    </Title>
                    <Paragraph
                        variant={'body-2'}
                        className={styles['profile-label']}
                        color={'neutral'}
                    >
                        {'No Handphone'}
                    </Paragraph>
                    <Title
                        tagElement={'p'}
                        variant={'title-1'}
                        weight={'medium'}
                        className={styles['profile-data']}
                    >
                        {user.phone}
                    </Title>
                    <Paragraph
                        variant={'body-2'}
                        className={styles['profile-label']}
                        color={'neutral'}
                    >
                        {'No Rekening'}
                    </Paragraph>
                    <Title
                        tagElement={'p'}
                        variant={'title-1'}
                        weight={'medium'}
                        className={styles['profile-data']}
                    >
                        {user.bankAccount || '-'}
                    </Title>
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() => setIsOpen(true)}
                    >
                        {'Edit'}
                    </Button>
                </div>
            )}
        </section>
    );
};

export default ProfilePage;
