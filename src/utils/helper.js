import axios from 'axios';

export const formatRupiah = value => {
    if (value === undefined) return `Rp 0`;
    let string = value.toString();
    let remainder = string.length % 3;
    let rupiah = string.substr(0, remainder);
    let thousand = string.substr(remainder).match(/\d{3}/g);

    if (thousand) {
        let separator = remainder ? '.' : '';
        rupiah += separator + thousand.join('.');
    }

    return `Rp ${rupiah}`;
};

export const setToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.headers.common['Authorization'];
    }
};
