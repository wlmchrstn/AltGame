import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.scss';

// Components
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Modal from '../../components/modal/modal';
import Notification from '../../components/notification/notification';

// Assets
import camera_purple from '../../assets/icons/fi_camera_purple.svg';
import Title from '../../components/title/title';

// Modules
// import ProfileEdit from '../../modules/profile-edit/profile-edit';

// Actions
import { getUser } from '../../stores/actions/ActionAuth';
import Spinner from '../../components/spinner/spinner';
import ProfileEdit from '../../modules/profile-edit/profile-edit';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [notification, setNotification] = useState(false);
    const [failedNotification, setFailedNotification] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.ReducerAuth);

    useEffect(() => {
        dispatch(getUser(setUserData, setIsLoading));
    }, [dispatch]);

    return (
        <section className={styles.root}>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modal}
            >
                <ProfileEdit
                    user={userData}
                    notification={setNotification}
                    failedNotification={setFailedNotification}
                />
            </Modal>
            <Notification
                message={error}
                variant={'failed'}
                show={failedNotification}
                setShow={setFailedNotification}
            />
            <Notification
                message={'Berhasil update profile'}
                variant={'success'}
                show={notification}
                setShow={setNotification}
            />
            {isLoading ? (
                <Spinner variant={'page'} />
            ) : (
                <div className={styles.profile}>
                    <div className={styles.camera}>
                        <img src={camera_purple} alt={'fi_camera_purple'} />
                    </div>
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
                        {userData.name}
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
                        {'Batam'}
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
                        {userData.phone}
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
