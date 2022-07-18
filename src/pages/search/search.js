import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './search.module.scss';

// Components
import Card from '../../components/card/card';
import Spinner from '../../components/spinner/spinner';
import Paragraph from '../../components/paragraph/paragraph';

// Assets
import iconEmpty from '../../assets/icons/fi_empty.svg';
import Title from '../../components/title/title';

const SearchPage = () => {
    const { search, searchLoading } = useSelector(
        state => state.ReducerProduct
    );
    const navigate = useNavigate();

    const handleMapping = params => {
        if (params.length === 0) {
            return (
                <div className={styles.empty}>
                    <img src={iconEmpty} alt={'icon-empty'} />
                    <Paragraph
                        className={styles['empty-text']}
                        variant={'body-1'}
                        color={'black'}
                        weight={'medium'}
                    >
                        {'Produk tidak ketemu'}
                    </Paragraph>
                </div>
            );
        } else {
            return (
                <div className={styles.product}>
                    {params.map((value, index) => {
                        return (
                            <Card
                                key={index}
                                data={value}
                                onClick={() =>
                                    navigate(`/product/${value.productId}`)
                                }
                            />
                        );
                    })}
                </div>
            );
        }
    };

    return (
        <section className={styles.root}>
            <Title tagElement={'h2'} variant={'heading-2'} weight={'bold'}>
                {'Hasil Pencarian'}
            </Title>
            {searchLoading === true ? (
                <div className={styles.loading}>
                    <Spinner variant={'page'} />
                </div>
            ) : (
                <>{handleMapping(search)}</>
            )}
        </section>
    );
};

export default SearchPage;
