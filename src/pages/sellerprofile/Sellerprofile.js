import React from 'react';
import logoheader from '../../assets/images/Rectangle 127.png';
import profile from '../../assets/images/Group 1.png';
import arrowleft from '../../assets/images/fi_arrow-left.png';
import '../sellerprofile/sellerprofile.scss';

const Sellerprofile = () => {
    return (
        <div className="main-container">
            <div className="header-container">
                <img src={logoheader} /> <h3>Lengkapi Info Akun</h3>
            </div>
            <div className="container-main">
                <img src={arrowleft} className="arrowleft" />
                <img src={profile} className="profile" />
            </div>
            <div className="container-content">
                <div className="container-main-01">
                    <p>Nama*</p>
                    <input
                        typeof="text"
                        placeholder="Nama"
                        name="text"
                        className="Nama"
                    />
                </div>
                <div className="container-main-02">
                    <p>Kota*</p>
                    <input
                        typeof="text"
                        placeholder="Pilih Kota"
                        name="text"
                        className="Nama"
                    />
                </div>
                <div className="container-main-03">
                    <p>Alamat*</p>
                    <input
                        typeof="text"
                        placeholder="Contoh: Jalan Ikan Hiu 33"
                        name="text"
                        className="Nama"
                    />
                </div>
                <div className="container-main-04">
                    <p>No Handphone*</p>
                    <input
                        typeof="text"
                        placeholder="contoh: +628123456789"
                        name="text"
                        className="Nama"
                    />
                </div>

                <button className="Save-button">Simpan</button>
            </div>
        </div>
    );
};

export default Sellerprofile;
