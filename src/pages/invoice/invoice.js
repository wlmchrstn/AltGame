import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './invoice.module.scss';
import { formatRupiah } from '../../utils/helper';
// Components
import Spinner from '../../components/spinner/spinner';
import Title from '../../components/title/title';

// Assets
import logo from '../../assets/images/logo.svg';

// Actions
import { getInvoice } from '../../stores/actions/ActionBid';

const InvoicePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, invoice } = useSelector(state => state.ReducerBid);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getInvoice(id, navigate));
    }, [dispatch]);

    if (loading) return <Spinner variant={'page'} />;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <img src={logo} alt={'logo'} />
                <div className={styles['invoice-number']}>
                    <Title
                        tagElement={'h2'}
                        variant={'title-1'}
                        weight={'bold'}
                    >
                        {'I N V O I C E'}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {invoice.noInvoice}
                    </Title>
                </div>
            </div>
            <div className={styles.sub}>
                <div className={styles['sub-left']}>
                    <Title
                        tagElement={'h2'}
                        variant={'title-1'}
                        weight={'bold'}
                    >
                        {'DITERBITKAN ATAS NAMA'}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {`Penjual : ${invoice.seller}`}
                    </Title>
                </div>
                <div className={styles['sub-right']}>
                    <Title
                        tagElement={'h2'}
                        variant={'title-1'}
                        weight={'bold'}
                    >
                        {'UNTUK'}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {`Pembeli : ${invoice.buyer}`}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {`Tanggal Pembelian : ${moment(
                            invoice.createdAt
                        ).format('LL')}`}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {`Alamat Pengiriman : ${invoice.address}`}
                    </Title>
                </div>
            </div>
            <div className={styles.product}>
                <hr />
                <Title tagElement={'h2'} variant={'title-1'} weight={'bold'}>
                    {'INFO PRODUK'}
                </Title>
                <hr />
                <div className={styles['product-detail']}>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {invoice.name}
                    </Title>
                    <div className={styles.wrapper}>
                        <div
                            className={styles['product-image']}
                            style={{
                                backgroundImage: `url('${invoice.image}')`,
                            }}
                        />
                    </div>
                    <Title
                        className={styles['line-through']}
                        tagElement={'h2'}
                        variant={'title-1'}
                    >
                        {`Harga Produk : ${formatRupiah(invoice.productPrice)}`}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {`Harga Tawar : ${formatRupiah(invoice.bidPrice)}`}
                    </Title>
                </div>
            </div>
            <hr />
            <div className={styles.footer}>
                <div className={styles['footer-left']}>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {'Invoice ini sah dan diproses oleh komputer'}
                    </Title>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {
                            'Silahkan hubungi AltGame Care apabila kamu membutuhkan bantuan.'
                        }
                    </Title>
                </div>
                <div className={styles['footer-right']}>
                    <Title tagElement={'h2'} variant={'title-1'}>
                        {`Terakhir diupdate: ${moment(invoice.updatedAt).format(
                            'LLL'
                        )}`}
                    </Title>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
