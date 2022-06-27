import React, { useState } from 'react';
import styles from './profile.module.scss';

// Components
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';

// Assets
import camera_purple from '../../assets/icons/fi_camera_purple.svg';
import Title from '../../components/title/title';

// Modules
import ProfileEdit from '../../modules/profile-edit/profile-edit';

const ProfilePage = () => {
    const [edit, setEdit] = useState(false);

    return (
        <section className={styles.root}>
            {edit ? (
                <ProfileEdit handleEdit={setEdit} />
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
                        {'William Christian'}
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
                        {'Alamat'}
                    </Paragraph>
                    <Title
                        tagElement={'p'}
                        variant={'title-1'}
                        weight={'medium'}
                        className={styles['profile-data']}
                    >
                        {'Perumahan Kintamani'}
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
                        {'+62 822 7800 1173'}
                    </Title>
                    <Button
                        type={'button'}
                        variant={'primary'}
                        onClick={() => setEdit(true)}
                    >
                        {'Edit'}
                    </Button>
                </div>
            )}
        </section>
    );
};

export default ProfilePage;
